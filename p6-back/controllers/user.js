import bcrypt from 'bcrypt';
import User from "../models/user.js";
import token from 'jsonwebtoken';

export async function signup (req, res, next){
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10); // 10 : saler 10 fois pour bien sécuriser le mot de passe
      const user = new User({
        email: req.body.email,
        password: hashedPassword
      });
      await user.save();
      res.status(201).json({ message: 'Utilisateur créé !' });
    } 
    catch (error) {
      console.error(error);
      res.status(400).json({ error });
    }
};

export async function login (req, res, next){
    try {
      const user = await User.findOne({ email: req.body.email });
      const validPassword = await bcrypt.compare(req.body.password, user.password);
      if (!user || !validPassword) {
        return res.status(401).json({ message: 'Login/mot de passe incorrecte' });
      }
      res.status(200).json({
        userId: user._id,
        token: token.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        )
      });
    } 
    catch (error) {
      console.error(error);
      res.status(500).json({ error });
    }
};