import jwt from 'jsonwebtoken';

import dotenv from 'dotenv';
dotenv.config();

export default (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.VITE_JWT_TOKEN);
        const userId = decodedToken.userId;
        const isCompany = !!decodedToken.siret; // '!!' convertit en boolean

        req.auth = {
            userId: userId,
            isCompany: isCompany
        }

        next();
    } catch (error) {
        res.status(401).json({ error })
    }
}