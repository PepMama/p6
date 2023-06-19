import { json } from "express";
import Sauce from "../models/sauces.js";

function normalizer(sauce, req){
    return {
        ...sauce, 
        imageUrl: `${req.protocol}://${req.get('host')}/images/${sauce.imageName}`,
        likes: sauce.usersLiked.length,
        dislikes: sauce.usersDisliked.length
    }
}

export async function listeSauces(req, res){
    // res.status(200).json([])
    try {
        const sauces = await Sauce.find();
        const normalizerSauces = sauces.map(sauce => normalizer(sauce.toObject(), req));
        res.status(200).json(normalizerSauces);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error });
    }
}

export async function createSauce(req, res){
    try {
        const body = JSON.parse(req.body.sauce);
        const sauce = new Sauce( {
            userId: req.auth.userId,
            name: body.name,
            manufacturer: body.manufacturer ,
            description:body.description ,
            mainPepper:body.mainPepper ,
            imageName: req.file.filename,
            heat:body.heat ,
            usersLiked: [],
            usersDisliked: []
        });
        await sauce.save();
        res.status(201).json({ message: 'Sauce créée !' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error });
    }
}

export async function displaySauce(req, res){
    try {
        const afficherSauce = await Sauce.findOne({
            _id: req.params.id
        });
        const normalizerSauce = normalizer(afficherSauce.toObject(), req);
        res.status(200).json(normalizerSauce);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error });  
    }
}

export async function deleteSauce(req, res){
    try {
        const userId = req.auth.userId;
        const sauce = await Sauce.findOne(
            {_id: req.params.id}
        ); 

        if(userId !== sauce.userId){
            return res.status(401).json({ message : "Minterdiction de supprimer la sauce !" });
        }

        await Sauce.deleteOne({
            _id: req.params.id
        });

        res.status(201).json({ message: 'Sauce supprimée !' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error });
    }
}

export async function modifierSauce(req, res){
    try {
        const userId = req.auth.userId;
        const sauce = await Sauce.findOne(
            {_id: req.params.id}
        ); 

        if(userId !== sauce.userId){
            return res.status(401).json({ message : "Interdiction de maudifier la sauce !" });
        }

        await Sauce.updateOne(
            { _id: req.params.id },
            { ...req.body, _id: req.params.id }
        );
    
        res.status(200).json({ message: 'Sauce modifiée !' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error });
    }
}

export async function likeSauce(req, res){
    try {
        const sauce = await Sauce.findOne(
            {_id: req.params.id}
        ); 
        const userId = req.auth.userId;
        const like = req.body.like;

        sauce.usersLiked = sauce.usersLiked.filter(userLike => userLike !== userId);
        sauce.usersDisliked = sauce.usersDisliked.filter(userDislike => userDislike !== userId);

        if(like === 1){
            sauce.usersLiked.push(userId);
        }else if(like === -1){
            sauce.usersDisliked.push(userId);
        }

        await sauce.save();

        res.status(200).json({ message: 'Sauce Likée !' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error });
    }
}
