import mongoose from "mongoose";
import mongooseUniqueValidator from "mongoose-unique-validator";

const reservationSchema = mongoose.Schema({
    fastfoodId: { type: String, required: true },
    fastfoodPlanning: [
        {
            start: { type: String, required: true },
            end: { type: String, required: true },
            title: { type: String, required: true }
        }
    ]
});

export default mongoose.model('Reservation', reservationSchema)