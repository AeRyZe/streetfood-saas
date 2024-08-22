import { signup, login, verifyUser } from "../controllers/company.js";

import express from 'express';
const router = express.Router();

router.post('/register', signup);
router.post('/login', login);
router.get('/:token', verifyUser);

export default router