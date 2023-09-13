const express = require("express");
const passport = require("../api/passport");
const uiUser = require("../api/uiUserHandlers");

const uiUserRouter = express.Router();

uiUserRouter.post("/signup", uiUser.add);
uiUserRouter.post(
	"/login",
	passport.authenticate("local", { failureRedirect: "/login" }),
	uiUser.login
);
uiUserRouter.get("/login", uiUser.getLogin);
uiUserRouter.get("/me", uiUser.profile);

module.exports = uiUserRouter;
