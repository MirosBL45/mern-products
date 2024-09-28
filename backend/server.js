import express from "express";
import dotenv from 'dotenv';

import { connectDB } from "./database/config/db.js";
import productRoutes from "./routes/product.route.js";

// For .env files
dotenv.config();

// Starting the app (server)
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware --> allows us to accept JSON data in the req.body
app.use(express.json());

// APIs for Product Routes
app.use('/api/products', productRoutes);

// Listening that specific port
app.listen(PORT, () => {
    connectDB();
    console.log(`Server started at port: ${PORT}. Great job!!!`);
})