import mongoose from "mongoose";
import { Schema } from "mongoose";

const User = new Schema({
    name: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 20
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    cartData: {
        type: Object,
        default: {}
    }
},{minimize: false, timestamps: true});

const users = mongoose.model('users', User);

export default users;