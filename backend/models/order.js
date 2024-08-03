import mongoose from 'mongoose';
import mongooseUniqueValidator from 'mongoose-unique-validator';

const orderSchema = mongoose.Schema({
    fastfoodId: { type: String, required: true },
    fastfoodName: { type: String, required: true },
    fastfoodSiret: { type: String, required: true },
    pastOrders: [
        {
            customerId: { type: String, required: true },
            customerName: { type: String, required: true },
            orders: [
                {
                    orderDate: { type: Date, required: true },
                    orderContent: [
                        {
                            name: { type: String, required: true },
                            quantity: { type: Number, required: true },
                            price: { type: Number, required: true }
                        }
                    ],
                    totalPrice: { type: Number, required: true }
                }
            ]
        }
    ]
});

export default mongoose.model('Order', orderSchema)