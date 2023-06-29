import Express from "express";
import mongoose from "mongoose";
import cors from "cors";
import helmet from "helmet";
import * as dotEnv from "dotenv";
import userRoutes from "./routes/user.js";
import sauceRoutes from "./routes/sauces.js";
import path from "path";
import {fileURLToPath} from 'url';
import auth from "./middleware/auth.js";

dotEnv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

await mongoose.connect(process.env.MONGO_URI,
{ useNewUrlParser: true,
  useUnifiedTopology: true })
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch(() => console.log('Connexion à MongoDB échouée !'));
const app = Express();

app.use(Express.json());
app.use(helmet());
app.use(cors());
app.use('/api/auth', userRoutes);
app.use('/images', Express.static(path.join(__dirname, 'images')));
app.use('/api/sauces', auth, sauceRoutes);
app.use('/api/sauces/', sauceRoutes);

app.listen(process.env.PORT || 3000); //process.env.PORT : si la plateforme de déploiement propose un port par défaut