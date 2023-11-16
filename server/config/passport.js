import {ExtractJwt, Strategy as JwtStrategy} from "passport-jwt";

const opts = {
    secretOrKey: process.env.SECRET,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken();
};
//1.Define Strategy
const JwtPassportStrategy = new JwtStrategy(opts, function(jwt_payload, done) {
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
passport.use(JwtPassportStrategy);
};

export default passportConfig;