import dotenv from 'dotenv';
dotenv.config();

import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import User from '../models/user.js';
// import Company from '../models/company.js';

export const signup = (req, res) => {
    try {
        bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const newUser = new User ({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                password: hash,
                phone: req.body.phone
            });

            newUser.save()
            .then(() => res.status(201).json({ message: "Nouvel utilisateur enregistré !"}))
            .catch(error => {
                console.error("Error saving user:", error);
                res.status(400).json({ error });
            });
        })
        .catch(error => res.status(500).json({ error }));
    } catch(error) {
        res.status(500).json({ error })
    }
};

export const login = (req, res) => {
    try {
        User.findOne({ email: req.body.email })
        .then(user => {
            if (user) {
                bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (valid) {
                        res.status(200).json({
                            userId: user._id,
                            token: jwt.sign(
                                { userId: user._id },
                                process.env.VITE_JWT_TOKEN,
                                { expiresIn: '24h' }
                            )
                        })
                    } else {
                        res.status(401).json({ message: "Paire mail/mot de passe incorrecte !" })
                    }
                })
                .catch(error => res.status(500).json({ error }))
            } else {
                res.status(404).json({ message: "Utilisateur introuvable !"})
            }
        })
        .catch(error => res.status(400).json({ error }));
    } catch(error) {
        res.status(500).json({ error })
    }
};

// export const iscompany = async (req, res) => {
//     try {
//         const check = await Company.findOne({ phone: req.params.phone })
//         if (check) {
//             res.status(200).json({ message: true })
//         } else {
//             res.status(404).json({ message: false })
//         }
//         // .then(() => res.status(200).json({ message: true }))
//         // .catch(error => res.status(400).json({ error }))
//     } catch(error) {
//         res.status(500).json({ error })
//     }
// }