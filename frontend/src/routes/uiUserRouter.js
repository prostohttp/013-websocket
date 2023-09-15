const express = require("express");
const apiUser = require("../api/userHandlers");

const userRouter = express.Router();

userRouter.get("/login", apiUser.getLogin);
userRouter.get("/me", apiUser.getMe);
userRouter.get("/logout", apiUser.logout);
userRouter.post("/login", apiUser.postLogin);
userRouter.post("/signup", apiUser.postSignup);


module.exports = userRouter;
