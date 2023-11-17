import {ExtractJwt, Strategy as JwtStrategy} from "passport-jwt";
import * as dotenv from "dotenv";
import userModel from "../models/userModel.js";
dotenv.config();

// console.log('process.env.SECRET :>> ', process.env.SECRET);
const opts = {
    secretOrKey: process.env.SECRET,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

//1.Define Strategy
const jwtPassportStrategy = new JwtStrategy(opts, async function(jwt_payload, done) {

    //findOne method which we had in documentation is no longer valid so we need to rebuild it
    
    try {
        const user = await userModel.findById(jwt_payload.sub)
    
        if (user) {
            console.log('user found');
            return done(null, user);   
        } else {
            return done(null, false); 
        }
        
    } catch (error) {
        console.log(' passport err block ');
        return done(err, false); 
    }
    


    // userModel.findOne({id: jwt_payload.sub}, function(err, user) {
    //     if (err) {
    //         return done(err, false);
    //     }
    //     if (user) {
    //         return done(null, user);
    //     } else {
    //         return done(null, false);
    //         // or you could create a new account
    //     }
    // });
});
//2.use this strategy with passport

const passportConfig = (passport) => {
passport.use(jwtPassportStrategy);
};

export default passportConfig;