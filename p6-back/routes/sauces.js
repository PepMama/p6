import express from "express";
import * as sauceCtrl from "../controllers/sauces.js";
import multer from "../middleware/multer-config.js";


const router = express.Router();


// router.post('/', multer, sauceCtrl.createThing);
router.get('/', sauceCtrl.listeSauces);
router.post('/', multer, sauceCtrl.createSauce);

export default router;