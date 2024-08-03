import mongoose from "mongoose";
import mongooseUniqueValidator from "mongoose-unique-validator";

const companySchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    adress: { type: String, required: true },
    siret: { type: Number, required: true }
});

companySchema.plugin(mongooseUniqueValidator); // vérifie que les paramètres en "unique: true" sont bien uniques

export default mongoose.model('Company', companySchema)