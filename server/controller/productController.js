import productModel from "../models/productModel.js";

const getAllProducts = async (req, res) =>{
    // console.log('req :>> ', req);
    
    const allProducts = await productModel.find();
    // console.log('allProducts :>> ', allProducts);

    res.json({
    //    message: "all products", 
    // data: allProducts,
    // info: {
        number: allProducts.length,
        allProducts,
    //     pages: 1,
    // },
    });
};

export {getAllProducts};