import brandModel from "../models/brandModel.js"

const getAllBrands = async (req, res) => {
    const allBrands = await brandModel.find();
    res.json({
        number:allBrands.length,
        allBrands,
    });
};

export {getAllBrands};