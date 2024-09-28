import express from "express";

import { getProducts, createProduct, updateProduct, deleteProduct } from "../controllers/product/w-exportAllProduct.js";

const productRoutes = express.Router();


productRoutes.get('/', getProducts); // GET Method for products
productRoutes.post('/', createProduct); // POST Method for product
productRoutes.put('/:id', updateProduct); // PUT Method for product
productRoutes.delete('/:id', deleteProduct); // DELETE Method for product


export default productRoutes;