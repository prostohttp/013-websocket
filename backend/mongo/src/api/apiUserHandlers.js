const User = require("../model/User");

const addUser = async (req, res) => {
	const { userName, userLogin, userPassword } = req.body;
	const user = new User({
		userName,
		userLogin,
		userPassword,
	});
	try {
		const userExists = await User.findOne({ userLogin }).exec();
		if (!userExists) {
			await user.save();
			res.status(201).json(user);
		} else {
			res.status(404).json({ error: "Такой пользователь уже существует" });
		}
	} catch (error) {
		res.status(500).json(error.message);
	}
};

const loginUser = async (req, res) => {
	res.json(req.user);
};

const profileUser = async (req, res) => {
	const user = req.user;
	if (!user) {
		res.status(404).json({ error: "Пользователь не авторизован" });
	} else {
		res.json(req.user);
	}
};

const getLogin = (req, res) => {
	res.send("страница с формой входа / регистрации");
};

module.exports = {
	add: addUser,
	login: loginUser,
	profile: profileUser,
	getLogin: getLogin,
};
