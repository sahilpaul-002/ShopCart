import mongoose from "mongoose";
import { Schema } from "mongoose";

const AdminUser = new Schema({
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
},{minimize: false, timestamps: true});

const adminUsers = mongoose.model('adminUsers', AdminUser);

export default adminUsers;