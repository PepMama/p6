import express from "express";
const router = express.Router();
import userCtrl from "../controllers/user.js";

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router;
