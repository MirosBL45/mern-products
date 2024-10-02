import Product from "../../database/models/product.model.js";
import mongoose from "mongoose";

// PUT Method for product

export default async function updateProduct(req, res) {
    const { id } = req.params;

    const product = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: 'Product not found' });
    }

    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, product, { new: true });
        res.status(200).json({ success: true, data: updatedProduct, message: 'Product updated successfully' });
    } catch (error) {
        console.error(`Oops: ${error.message}`);
        res.status(500).json({ success: false, message: 'Server error' });
    }
}