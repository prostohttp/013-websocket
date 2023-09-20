const api = require("../api/fetch");

const DB_PORT = process.env.DB_PORT || 3334;
const DB_URL = process.env.DB_URL || "http://backend-mongo";

const getLogin = (req, res) => {
	const userId = req.userId;
	if (userId) {
		res.redirect("/user/me");
	} else {
		res.render("user/login", { error: {} });
	}
};

const getLogout = async (req, res) => {
	res.clearCookie("userName");
	res.clearCookie("userLogin");
	res.clearCookie("userId");
	res.redirect("/");
};

const getMe = async (req, res) => {
	const userName = req.cookies.userName;
	const userLogin = req.cookies.userLogin;
	if (userName) {
		res.render("user/me", { user: { userName, userLogin } });
	} else {
		res.render("user/login", {
			error: { message: "Войдите или зарегистрируйтесь" },
		});
	}
};

const postLogin = async (req, res) => {
	const { userLogin, userPassword } = req.body;
	const data = {
		userLogin,
		userPassword,
	};
	const profile = await api.fetch(
		`${DB_URL}:${DB_PORT}/user/login`,
		"POST",
		data
	);
	if (!profile) {
		res.render("user/login", {
			error: { message: "Неправильный логин или пароль" },
		});
	} else {
		res.cookie("userName", profile.user.userName, {
			maxAge: 1000 * 60 * 60 * 60,
		});
		res.cookie("userLogin", profile.user.userLogin, {
			maxAge: 1000 * 60 * 60 * 60,
		});
		res.cookie("userId", profile.userId, {
			maxAge: 1000 * 60 * 60 * 60,
		});
		res.render("user/me", { user: profile.user });
	}
};

const postSignup = async (req, res) => {
	const { userName, userLogin, userPassword } = req.body;
	const data = {
		userName,
		userLogin,
		userPassword,
	};
	await api.fetch(`${DB_URL}:${DB_PORT}/user/signup`, "POST", data);
	res.status(200).redirect("/");
};

module.exports = {
	getLogin: getLogin,
	logout: getLogout,
	postLogin: postLogin,
	getMe: getMe,
	postSignup: postSignup,
};
