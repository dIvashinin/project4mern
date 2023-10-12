import productModel from "../models/productModel.js";

const getAllProducts = async (req, res) =>{
    // console.log('req :>> ', req);
    
    try{
        const allProducts = await productModel.find();
        // console.log('allProducts :>> ', allProducts);
        if (allProducts.length<1) {
            res.status(204).json({message: "no products stored"});
        } else {
            res.status(200).json({
                number: allProducts.length,
                allProducts,
            });
        }
    } catch (error) {
        console.log('error :>> ', error);
        res.status (500).json({
            error: "something went wrong in the server",
        });
    }
};

const getProductsByCountryMadeIn = async (req, res) => {
//in request object we can see for ex what we typed, our path etc
    // console.log('req :>> ', req);
    // const countryMadeIn = req.params.countryMadeIn;
  const { countryMadeIn } = req.params;
  const { likes } = req.query;

  if (likes) {
    try {
      const products = await productModel.find({
        countryMadeIn: countryMadeIn,
        //gte = Greater Than Equal >=
        likes: { $gte: likes },
      });
      res.status(200).json({
        number: products.length,
        products,
      });
    } catch (error) {}

    //do stuff using likes
  } else {
    //all of the stuff below happens when there are no "likes" sent from the client.
    try {
      const products = await productModel.find({ countryMadeIn: countryMadeIn });
      if (products.length > 0) {
        res.status(200).json({
            number: products.length,
            products,
        });
      } else {
        res.status(200).json({
          number: products.length,
          message: `sorry no products with  country code ${countryMadeIn}`,
        });
      }
    } catch (error) {
      console.log("error :>> ", error);
      res.status(500).json({
        errorMessage: "something went wrong in the request",
        error,
      });
    }
  }
};



export {getAllProducts, getProductsByCountryMadeIn};