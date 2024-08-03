import dotenv from 'dotenv';
dotenv.config();

import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import Company from '../models/company.js';

export const signup = (req, res) => {
    try {
        bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const newCompany = new Company ({
                name: req.body.name,
                email: req.body.email,
                password: hash,
                phone: req.body.phone,
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                adress: req.body.adress,
                siret: req.body.siret
            });
            newCompany.save()
            .then(() => res.status(201).json({ message: "Nouvelle entreprise enregistrée !"}))
            .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
    } catch(error) {
        res.status(500).json({ error })
    }
};

export const login = (req, res) => {
    try {
        Company.findOne({ email: req.body.email })
        .then(user => {
            if (user) {
                bcrypt.compare(req.body.email, user.email)
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
                res.status(404).json({ message: "Entreprise introuvable !"})
            }
        })
        .catch(error => res.status(400).json({ error }));
    } catch(error) {
        res.status(500).json({ error })
    }
};