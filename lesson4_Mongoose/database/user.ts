import {Schema, model} from 'mongoose';

const userSchema = new Schema({
    name: { type: String, required: true, default: '' },
    email: { type: String, required: true, trim: true, lowercase: true, unique: true },
    age: { type: Number, default: 18 }
}, {
    timestamps: true
});

export const userModel = model('user', userSchema);
