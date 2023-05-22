import Express from "express";
import mongoose from "mongoose";
import cors from "cors";
import * as dotEnv from "dotenv";
import userRoutes from "./routes/user.js";



dotEnv.config();


await mongoose.connect(process.env.MONGO_URI,
{ useNewUrlParser: true,
  useUnifiedTopology: true })
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch(() => console.log('Connexion à MongoDB échouée !'));
const app = Express();

app.use(Express.json());
app.use(cors());
app.use('/api/auth', userRoutes);
app.listen(process.env.PORT || 3000); //process.env.PORT : si la plateforme de déploiement propose un port par défaut