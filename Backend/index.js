import express from 'express';
import connectDB from './config/db.js';
import dotenv from 'dotenv';

const app = express()

// Load environment variables from .env file
dotenv.config();
const port = process.env.PORT || 5000

// Connect to MongoDB
connectDB();

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`ShopCart app listening on port "http://localhost:${port}"`)
})