import mongoose from "mongoose";
import mongooseUniqueValidator from "mongoose-unique-validator";

const userSchema = mongoose.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true }
});

userSchema.plugin(mongooseUniqueValidator); // vérifie que les paramètres en "unique: true" sont bien uniques

export default mongoose.model('User', userSchema)