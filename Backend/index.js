import express from 'express';
import connectDB from './config/db.js';
import dotenv from 'dotenv';
import cors from 'cors'
import cookieParser from 'cookie-parser';
import { router as authRouter } from './routes/UserAuth.js';

const app = express()

// Load environment variables from .env file
dotenv.config();
const port = process.env.PORT || 5000
const cookieSecretKey = process.env.COOKIE_SECRET_KEY

// Connect to MongoDB
connectDB();

// Enable cors
app.use(cors())

// Enable cookie-parser middleware
app.use(cookieParser(cookieSecretKey));

// Middle ware to handle json request body
app.use(express.json())

// Server route (root)
app.get('/', (req, res) => {
  res.send('Hello World!')
});

// Individual routes
app.use('/api/auth', authRouter);


app.listen(port, () => {
  console.log(`ShopCart app listening on port "http://localhost:${port}"`)
})