import Product from "../../database/models/product.model.js";
import mongoose from "mongoose";

// DELETE Method for product

export default async function deleteProduct(req, res) {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: 'Product not found' });
    }

    try {
        const searchedProduct = await Product.findById(id);

        await Product.findByIdAndDelete(id);
        res.status(200).json({ deleted_product: searchedProduct.name, success: true, message: 'Product Deleted' });
    } catch (error) {
        console.error(`Oops: ${error.message}`);
        res.status(500).json({ success: false, message: 'Server error' });
    }
}