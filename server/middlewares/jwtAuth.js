import passport from "passport";

//5. turn passport into a middleware we can use in our routes
const jwtAuth = passport.authenticate("jwt", {session:false});

export default jwtAuth;