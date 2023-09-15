const api = require("../api/fetch");

const DB_PORT = process.env.DB_PORT || 3334;
const DB_URL = process.env.DB_URL || "http://backend-mongo";

const getLogin = (req, res) => {
	const myCookies = req.cookies.user;
	if (myCookies) {
		res.redirect("/user/me");
	} else {
		res.render("user/login", { error: {} });
	}
};

const getLogout = async (req, res) => {
	await api.fetch(`${DB_URL}:${DB_PORT}/user/logout`)
	res.clearCookie("user");
	res.clearCookie("userId");
	res.redirect("/");
}

const getMe = async (req, res) => {
	const myCookies = req.cookies.user;
	if (myCookies) {
		res.render("user/me", { user: myCookies });
	} else {
		res.render("user/login", { error: {message: "Войдите или зарегистрируйтесь"} });
	}
};

const postLogin = async (req, res) => {
	const { userLogin, userPassword } = req.body;
	const data = {
		userLogin,
		userPassword,
	};
	const {user, userId} = await api.fetch(
		`${DB_URL}:${DB_PORT}/user/login`,
		"POST",
		data
	);
	if (!user) {
		res.render("user/login", {
			error: { message: "Неправильный логин или пароль" },
		});
	} else {
		res.cookie("user", user);
		res.cookie("userId", userId);
		res.render("user/me", { user });
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
