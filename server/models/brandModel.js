import mongoose from "mongoose";

const brandSchema = new mongoose.Schema({
    name: {
        type:String,
        required: true,
    },
    collection: {
        type:String,
        required: true,
    },
    composition: {
        type:String,
        required: true,
    },
});

const brandModel = mongoose.model("brand", brandSchema);

export default brandModel;