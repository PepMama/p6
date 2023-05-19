import Express from "express";
import mongoose from "mongoose";

import userRoutes from "./routes/user.js";



await mongoose.connect('mongodb+srv://pmaelic:qSg8KcF68xrNtji3@cluster0.wwvrxdk.mongodb.net/?retryWrites=true&w=majority');
const app = Express();

app.use((req, res, next) => {
    // accéder à notre API depuis n'importe quelle origine 
    res.setHeader('Access-Control-Allow-Origin', '*'); 
    // ajouter les headers mentionnés aux requêtes envoyées vers notre API 
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    // envoyer des requêtes avec les méthodes mentionnées 
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// app.post('/api/auth/signup', async (req, res) => {
//     try {
//       const { email, password } = req.body;
//       const newUser = new User({ email, password });
//       await newUser.save();
//       res.status(201).json(newUser); // Répondez avec les données de l'utilisateur créé
//     } catch (error) {
//       res.status(400).json({ message: error.message });
//     }
// });


app.use('/api/auth', userRoutes);

app.listen(process.env.PORT || 3000); //process.env.PORT : si la plateforme de déploiement propose un port par défaut