import mongoose from "mongoose";

const brandSchema = new mongoose.Schema({
    name: {
        type:String,
        required: true,
    },
    season: {
        type:String,
        required: true,
    },
    composition: {
        type:String,
        required: true,
    },
    product:{type:mongoose.Schema.Types.ObjectId, ref: "product"},
});

const brandModel = mongoose.model("brand", brandSchema);

export default brandModel;