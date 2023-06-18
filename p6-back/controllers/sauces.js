import { json } from "express";
import Sauce from "../models/sauces.js";

export async function listeSauces(req, res, next){
    // res.status(200).json([])
    try {
        const sauce = await Sauce.find();
        res.status(200).json(sauce);
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
        res.status(201).json(afficherSauce);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error });  
    }
}

export async function deleteSauce(req, res){
    try {
        const sauceDelete = await Sauce.deleteOne({
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
        const modifSauce = await Sauce.updateOne(
            { _id: req.params.id },
            { ...req.body, _id: req.params.id }
        );
    
        res.status(200).json({ message: 'Sauce modifiée !' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error });
    }
}