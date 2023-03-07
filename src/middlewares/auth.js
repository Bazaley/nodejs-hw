import passport from "passport";

export const auth = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user) => {
    if (!user || err) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }

    req.user = user;
    next();
  })(req, res, next);
};
