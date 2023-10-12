import brandModel from "../models/brandModel.js"

const getAllBrands = async (req, res) => {
    const allBrands = await brandModel.find().populate("product");
    // if we wanna be picky, we can create an object inside of populate
    // const allBrands = await brandModel.find().populate({path:"product", select:["location","countryMadeIn", "likes"] });
    res.json({
        number:allBrands.length,
        allBrands,
    });
};

export {getAllBrands};