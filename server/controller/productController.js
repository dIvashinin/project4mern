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

const getCitiesByCountryCode = async (req, res) => {
//in request object we can see for ex what we typed, our path etc
    // console.log('req :>> ', req);
}

export {getAllProducts, getCitiesByCountryCode};