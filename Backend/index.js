import express from 'express';
import connectDB from './config/db.js';
import dotenv from 'dotenv';
import cors from 'cors'
import cookieParser from 'cookie-parser';
import { router as authRouter } from './routes/UserAuth.js';
import {router as userRouter} from './routes/UserRoutes.js';
import {router as adminRouter} from './routes/AdminRoutes.js';
import {router as productRouter} from './routes/ProductRoutes.js';
import {router as cartRouter} from './routes/CartRoutes.js';

const app = express()

// Load environment variables from .env file
dotenv.config();
const port = process.env.PORT || 5000
const cookieSecretKey = process.env.COOKIE_SECRET_KEY
// const cookieSecretKey = undefined

// Connect to MongoDB
connectDB();

// Enable cors
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174', 'https://68fe5681f29f22b690da1094--shopecomcart.netlify.app/'],
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
app.use('/api/user', userRouter);
app.use('/api/admin', adminRouter);
app.use('/api/admin/product', productRouter);
app.use('/api/cart', cartRouter);

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