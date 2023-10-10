import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type:String,
        required: true,
    },
    // countryMadeIn: {
    //     type:String,
    //     required: true,
    // },
    // likes: {
    //     type:Number,
    // },
});

const productModel = mongoose.model("product", productSchema);

export default productModel;