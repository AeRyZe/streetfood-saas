import jwt from 'jsonwebtoken';

import dotenv from 'dotenv';
dotenv.config();

export default (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, import.meta.env.VITE_JWT_TOKEN);
        const userId = decodedToken._id;
        const isCompany = decodedToken.siret;

        req.auth = {
            userId: userId,
            type: isCompany ? "Company" : "Client"
        }

        next();
    } catch (error) {
        res.status(401).json({ error })
    }
}