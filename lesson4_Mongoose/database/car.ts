import {Schema, model, Types} from 'mongoose';

const carSchema = new Schema({
    model: { type: String, required: true, trim: true },
    year: { type: Number, default: 2022 },
    price: { type: Number, default: 10000 },
    user: { type: Types.ObjectId, ref: 'user' }
}, {
    timestamps: true
});

export const carModel = model('car', carSchema);
