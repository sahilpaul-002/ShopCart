import mongoose from "mongoose";
import { Schema } from "mongoose";

const Product = new Schema({
    name: {
        type: String,
        required: true,
    },
    image1: {
        type: String,
        required: true,
    },
    image2: {
        type: String,
        required: true,
    },
    image3: {
        type: String,
        required: true,
    },
    image4: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    subCategory: {
        type: String,
        required: true,
    },
    sizes: {
        type: Array,
        default: []
    },
    date: {
        type: Number,
        required: true,
    },
    bestSeller: {
        type: Boolean,
    },
},{minimize: false, timestamps: true});

const products = mongoose.model('products', Product);

export default products;