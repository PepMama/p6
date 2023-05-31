import express from "express";

import * as userCtrl from "../controllers/user.js";


import * as sauceCtrl from "../controllers/sauces.js"
// import user from "../models/user.js";
const router = express.Router();


router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);



export default router;
