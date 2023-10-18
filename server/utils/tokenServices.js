import jwt from "jsonwebtoken";

const generateToken = (userID) => {
    const payload = {
        sub: userID,
    };

    const secretOrPrivateKey = process.env.SECRET;
    const token = jwt.sign(payload, secretOrPrivateKey);
    console.log('token :>> ', token);
    return token;
};

export {generateToken};