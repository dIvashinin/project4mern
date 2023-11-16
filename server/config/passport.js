import {ExtractJwt, Strategy as JwtStrategy} from "passport-jwt";
import * as dotenv from "dotenv";
dotenv.config();

// console.log('process.env.SECRET :>> ', process.env.SECRET);
const opts = {
    secretOrKey: process.env.SECRET,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

//1.Define Strategy
const jwtPassportStrategy = new JwtStrategy(opts, function(jwt_payload, done) {
    User.findOne({id: jwt_payload.sub}, function(err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    });
});
//2.use this strategy with passport

const passportConfig = (passport) => {
passport.use(jwtPassportStrategy);
};

export default passportConfig;