import Waiting from '../models/waiting.js';
import Reservation from '../models/reservation.js';
import fs from 'fs';

export const getPlanning = (req, res) => {
    Waiting.findOne({ fastfoodId: req.params.fastfoodId })
    .then(planning => res.status(200).json(planning))
    .catch(error => res.status(500).json({ error }))
};

export const addPlanning = (req, res) => {
    Waiting.findOne({ fastfoodId: req.params.fastfoodId })
    .then(planning => {
        if (!planning) {
            const newPlanning = new Waiting ({
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
            .then(() => res.status(201).json({ message: "Demande envoyée !"}))
            .catch(error => res.status(500).json({ error }))
        } else {
            planning.fastfoodPlanning.push({
                start: req.body.start,
                end: req.body.end,
                title: req.body.title
            });

            planning.save()
            .then(() => res.status(200).json({ message: 'Demande envoyée !'}))
            .catch(error => res.status(500).json({ error }))
        }
    })
    .catch(error => res.status(500).json({ error }))
};

export const confirmPlanning = (req, res) => {
    Waiting.updateOne(
        { fastfoodId: req.params.fastfoodId, "fastfoodPlanning._id": req.body._id },
        { $set: { "fastfoodPlanning.$.validation": true } }
    )
    .then(() => res.status(200).json({ message: 'Demande acceptée !'}))
    .catch(error => res.status(404).json({ error }))
};

// export const storePlanning = (req, res) => {
//     Waiting.findOne({ fastfoodId: req.params.fastfoodId })
//     .then(waitingObject => {
//         const objectToMove = waitingObject.fastfoodPlanning.id(req.body._id);

//         Reservation.findOne({ fastfoodId: req.params.fastfoodId })
//         .then(planning => {
//             if (!planning) {
//                 const newPlanning = new Reservation ({
//                     fastfoodId: req.params.fastfoodId,
//                     fastfoodPlanning: [{...objectToMove}]
//                 });

//                 newPlanning.save()
//                 .then(() => res.status(201).json({ message: "Réservation enregistrée !"}))
//                 .catch(error => res.status(500).json({ error }))
//             } else {
//                 planning.fastfoodPlanning.push({...objectToMove});

//                 planning.save()
//                 .then(() => res.status(201).json({ message: 'Réservation enregistrée !'}))
//                 .catch(error => res.status(500).json({ error }))
//             }
//         })
//         .catch(error => res.status(404).json({ error }))
//     })
//     .catch(error => res.status(404).json({ error }))
// };

export const deletePlanning = (req, res) => {
    Waiting.updateOne(
        { fastfoodId: req.params.fastfoodId },
        { $pull: { fastfoodPlanning: { _id: req.body._id } } }
    )
    .then(() => res.status(200).json({ message: 'Réservation supprimée !' }))
    .catch(error => res.status(404).json({ error }))
};

export const editPlanning = (req, res) => {
    Waiting.updateOne(
        { fastfoodId: req.params.fastfoodId, "fastfoodPlanning._id": req.body._id },
        { $set: { "fastfoodPlanning.$.start": req.body.start, "fastfoodPlanning.$.end": req.body.end } }
    )
    .then(() => res.status(200).json({ message: 'Réservation modifiée !'}))
    .catch(error => res.status(404).json({ error }))
}