const api = require("../api/fetch");

const DB_PORT = process.env.DB_PORT || 3334;
const DB_URL = process.env.DB_URL || "http://backend-mongo";

const getLogin = (req, res) => {
	res.render("user/login", { error: {} });
};

const getMe = async (req, res) => {
	const user = await api.fetch(`${DB_URL}:${DB_PORT}/user/me`);
	if (!user) {
		res.render("user/login", {error: {message: "Для доступа в ЛК войдите на сайт"}} );
	} else {
    res.redirect("/user/me");
	}
};

const postLogin = async (req, res) => {
	const { userLogin, userPassword } = req.body;
	const data = {
		userLogin,
		userPassword,
	};
	const user = await api.fetch(`${DB_URL}:${DB_PORT}/user/login`, "POST", data);
	if (!user) {
		res.render("user/login", {
			error: { message: "Неправильный логин или пароль" },
		});
	} else {
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
	postLogin: postLogin,
	getMe: getMe,
	postSignup: postSignup,
};
