import Product from "../../database/models/product.model.js";

// GET Method for products

export default async function getProducts(req, res) {
    try {
        const products = await Product.find({});
        res.status(200).json({ success: true, data: products });
    } catch (error) {
        console.error(`Oops: ${error.message}`);
        res.status(500).json({ success: false, message: 'Products not found' });
    }
}