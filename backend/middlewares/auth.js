import jwt from 'jsonwebtoken';

import dotenv from 'dotenv';
dotenv.config();

export default (req, res, next) => {
    try {
        console.log(req.body);
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, import.meta.env.VITE_JWT_TOKEN);
        const userId = decodedToken.userId;

        req.auth = {
            userId: userId
        };

        next();
    } catch (error) {
        res.status(401).json({ error })
    }
}