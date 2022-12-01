import {Schema, model} from 'mongoose';

const oAuthSchema = new Schema({
    _user_id: { type: Schema.Types.ObjectId, ref: 'user' },
    accessToken: { type: String },
    refreshToken: { type: String },
}, {
    timestamps: true
});

export const oAuthModel = model('oAuth', oAuthSchema);
