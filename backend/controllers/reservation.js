import Reservation from '../models/reservation.js';
import fs from 'fs';

export const getPlanning = (req, res) => {
    Reservation.findOne({ fastfoodId: req.params.fastfoodId })
    .then(planning => res.status(200).json(planning))
    .catch(error => res.status(500).json({ error }))
};

export const addPlanning = (req, res) => {
    Reservation.findOne({ fastfoodId: req.params.fastfoodId })
    .then(planning => {
        if (!planning) {
            const newPlanning = new Reservation ({
                fastfoodId: req.body.fastfoodId,
                fastfoodPlanning: [
                    {
                        start: req.body.start,
                        end: req.body.end,
                        title: req.body.title
                    }
                ]
            });

            newPlanning.save()
            .then(() => res.status(201).json({ message: "Nouveau planning crée !"}))
            .catch(error => res.status(500).json({ error }))
        } else {
            planning.fastfoodPlanning.push({
                start: req.body.start,
                end: req.body.end,
                title: req.body.title
            });

            planning.save()
            .then(() => res.status(200).json({ message: 'Planning mis à jour !'}))
            .catch(error => res.status(500).json({ error }))
        }
    })
    .catch(error => res.status(500).json({ error }))
}