import { json } from "express";
import Sauce from "../models/sauces.js";

export async function listeSauces(req, res, next){
    res.status(200).json([])
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