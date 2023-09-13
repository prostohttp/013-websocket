const express = require("express");
const passport = require("../api/passport");
const apiUser = require("../api/apiUserHandlers");

const apiUserRouter = express.Router();

apiUserRouter.post("/signup", apiUser.add);
apiUserRouter.post(
	"/login",
	passport.authenticate("local", {
		failureMessage: "Неправильный логин или пароль",
	}),
	apiUser.login
);
apiUserRouter.get("/login", apiUser.getLogin);
apiUserRouter.get(
	"/me",
	(req, res, next) => {
		if (!req.isAuthenticated()) {
			return res.json({ error: "Пользователь не авторизован" });
		}
		next();
	},
	apiUser.profile
);

module.exports = apiUserRouter;
