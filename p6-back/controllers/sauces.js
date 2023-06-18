import { json } from "express";
import Sauce from "../models/sauces.js";

function normalizer(sauce, req){
    return {
        ...sauce, 
        imageUrl: `${req.protocol}://${req.get('host')}/images/${sauce.imageName}`
    }
}

export async function listeSauces(req, res, next){
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
    // console.log(req.file);
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
        sauce.usersLiked.push(userId);
        await sauce.save();
        res.status(200).json({ message: 'Sauce Likée !' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error });
    }
}
