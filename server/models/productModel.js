import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type:String,
        required: true,
    },
    countryMadeIn: {
        type:String,
        required: true,
    },
    likes: {
        type:Number,
    },
    //as it can have more than 1 element inside, it's an array [...]
    brand:[{type:mongoose.Schema.Types.ObjectId, ref: "brand"}],
});

const productModel = mongoose.model("product", productSchema);

export default productModel;