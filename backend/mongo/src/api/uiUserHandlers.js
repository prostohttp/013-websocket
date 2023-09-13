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
			res.status(404).send({ error: "Такой пользователь уже существует" });
		}
	} catch (error) {
		res.status(500).json(error.message);
	}
};

const loginUser = async (req, res) => {
	req.session.userId = Math.random();
	console.log("Успешная аутентификация", req.session.userId);
	res.json(req.user);
};

const profileUser = async (req, res) => {
	//TODO сделать проверку на авторизацию
	if(req.session.userId) {
		res.json(req.user);
	} else {
		res.status(401).send({ error: "Необходима авторизация" });
	}
};

const getLogin = (req, res) => {
	res.json(req.user);
};

module.exports = {
	add: addUser,
	login: loginUser,
	profile: profileUser,
	getLogin: getLogin,
};
