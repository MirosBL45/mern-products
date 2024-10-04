import express from "express";
import dotenv from 'dotenv';
// using to connect FRONTEND AND BACKEND in one
import path from 'path';

import { connectDB } from "./database/config/db.js";
import productRoutes from "./routes/product.route.js";

// For .env files
dotenv.config();

// Starting the app (server)
const app = express();
const PORT = process.env.PORT || 5000;

// for joining with dist folder in frontend to connect FRONTEND AND BACKEND
const __dirname = path.resolve();

// Middleware --> allows us to accept JSON data in the req.body
app.use(express.json());

// APIs for Product Routes
app.use('/api/products', productRoutes);

// join with dist folder in frontend to connect FRONTEND AND BACKEND
if (process.env.NODE_ENV.trim() === 'production') {
    app.use(express.static(path.join(__dirname, '/frontend/dist')));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'));
    });
}

// Listening that specific port
app.listen(PORT, () => {
    connectDB();
    if (process.env.NODE_ENV.trim() === 'production') {
        console.log(`Server with frontend started at port: ${PORT}. Go to http://localhost:${PORT}`);
    } else {
        console.log(`Only server with no frontend started at port: ${PORT}. Great job!!!`);
    }
})