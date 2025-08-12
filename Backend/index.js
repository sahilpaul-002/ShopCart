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
const cookieSecretKey = process.env.COOKEI_SECRET_KEY

// Connect to MongoDB
connectDB();

// Enable cors
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}))

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

// Route to check coockie deleted
app.get("/check-cookie", (req, res) => {
    res.json({
        signedCookies: req.signedCookies,
        hasStoken: !!req.signedCookies.lToken
    });
});


app.listen(port, () => {
  console.log(`ShopCart app listening on port "http://localhost:${port}"`)
})