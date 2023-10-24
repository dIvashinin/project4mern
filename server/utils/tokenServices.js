import jwt from "jsonwebtoken";

const generateToken = (userID) => {
  const payload = {
    sub: userID,
    //we can put expiration time here ('exp'), but it will be displayed in a bad readable way
    // exp: 1234123434,
    //instead we add options below with a longer version 'expiresIn'
    //custom claims need to be put in payload
    // favPet: "cat ruby",
  };

  const secretOrPrivateKey = process.env.SECRET;

  const options = {
    expiresIn: "3 days",
  };

  const token = jwt.sign(payload, secretOrPrivateKey, options);
  console.log("token :>> ", token);
  return token;
};

export { generateToken };
