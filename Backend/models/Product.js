import mongoose from "mongoose";
import { Schema } from "mongoose";

const Product = new Schema({
    name: {
        type: String,
        required: true,
    },
    image1: {
        type: String,
        default: null
    },
    image2: {
        type: String,
        default: null
    },
    image3: {
        type: String,
        default: null
    },
    image4: {
        type: String,
        default: null
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    category: {
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
    bestSeller: {
        type: Boolean,
    },
},{minimize: false, timestamps: true});

const products = mongoose.model('products', Product);

export default products;