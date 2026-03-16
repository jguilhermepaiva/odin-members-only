const { Router } = require("express");
const authController = require("../controllers/authController");
const authRouter = Router();
const passport = require("passport");

authRouter.get("/log-in", authController.loginGet);

authRouter.post(
  "/log-in",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/auth/log-in",
  }),
);

authRouter.get("/sign-up", authController.signupGet);
authRouter.post("/sign-up", authController.signupPost);

authRouter.get("/join-club", authController.joinClubGet);
authRouter.post("/join-club", authController.joinClubPost);
authRouter.get("/log-out", authController.logoutGet);

authRouter.get("/admin", authController.adminGet);
authRouter.post("/admin", authController.adminPost);

module.exports = authRouter;
