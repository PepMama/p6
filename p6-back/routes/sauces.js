import express from "express";
import * as sauceCtrl from "../controllers/sauces.js";
import multer from "../middleware/multer-config.js";


const router = express.Router();


// router.post('/', multer, sauceCtrl.createThing);
router.get('/', sauceCtrl.listeSauces);
router.get('/:id', sauceCtrl.displaySauce);
router.post('/:id/like', sauceCtrl.likeSauce);
router.post('/', multer, sauceCtrl.createSauce);
router.put('/:id',  sauceCtrl.modifierSauce);
router.delete('/:id', sauceCtrl.deleteSauce);

export default router;