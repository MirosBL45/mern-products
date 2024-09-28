import Product from "../../database/models/product.model.js";

// POST Method for product

export default async function createProduct(req, res) {
    const product = req.body; //user will send this data

    if (!product.name || !product.price || !product.image) {
        return res.status(400).json({ success: false, message: 'Please provide all fields' });
    }

    if (typeof product.price !== 'number') {
        return res.status(400).json({ success: false, message: 'Price must be a number' });
    }

    if (typeof product.image !== 'string') {
        return res.status(400).json({ success: false, message: 'Image must be a string' });
    }

    const newProduct = new Product(product);

    try {
        await newProduct.save();
        res.status(201).json({ success: true, data: newProduct });
    } catch (error) {
        console.error(`Oops: ${error.message}`);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
}