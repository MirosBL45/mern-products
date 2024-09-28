import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
}, { timestamps: true });

// enables additional modifications to the database's schema
mongoose.models = {};
// it makes Product collection in DB (mern-products-project)
const Product = mongoose.model('Product', productSchema);

export default Product;