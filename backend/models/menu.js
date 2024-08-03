import mongoose from "mongoose";
import mongooseUniqueValidator from "mongoose-unique-validator";

const menuSchema = mongoose.Schema({
    fastfoodId: { type: String, required: true },
    fastfoodName: { type: String, required: true },
    menus: [
        {
            menuId: { type: String, required: true },
            menuName: { type: String, required: true },
            menuStyle: { type: String, required: true },
            menuContent: [
                {
                    name: { type: String, required: true },
                    price: { type: Number, required: true },
                    estimatedTime: { type: Number }
                }
            ]
        }
    ]
});

export default mongoose.model('Menu', menuSchema)