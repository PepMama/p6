import bcrypt from 'bcrypt';
import User from "../models/user.js";

exports.signup = async (req, res, next) => {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10); // 10 : 10 tours pour bien sécuriser le mot de passe
      const user = new User({
        email: req.body.email,
        password: hashedPassword
      });
      await user.save();
      res.status(201).json({ message: 'Utilisateur créé !' });
    } 
    catch (error) {
      res.status(400).json({ error });
    }
  };

exports.login = async (req, res, next) => {

};