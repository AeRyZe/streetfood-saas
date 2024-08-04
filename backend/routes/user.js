import { signup, login, verifyUser } from "../controllers/user.js";

import express from 'express';
const router = express.Router();

router.post('/register', signup);
router.post('/login', login);
router.get('/:token', verifyUser);

export default router