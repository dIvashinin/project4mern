import bcrypt from "bcrypt";


const hashPassword = async (userPassword) => {
const saltRounds = 10;
const salt = bcrypt.genSalt(saltRounds);
const hashedPassword = bcrypt.hash(userPassword, salt);
return hashedPassword;
};
export {hashPassword};