const User = require("../model/User");
const { v4: uuidv4 } = require("uuid");
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
	req.session.userId = uuidv4();
	const user = {
		userId: req.session.userId,
		userName: req.user.userName,
		userLogin: req.user.userLogin,
	};
	const userId = req.session.userId;
	res.json({user, userId});
};

const profileUser = async (req, res) => {

};

const getLogin = (req, res) => {
	res.json(req.user);
};

const logout = (req, res) => {
	req.session.destroy((err) => {
		if (err) {
			console.error('Ошибка при уничтожении сессии:', err);
    } else {
			res.redirect('/');
    }
  });
}

module.exports = {
	add: addUser,
	login: loginUser,
	profile: profileUser,
	getLogin: getLogin,
	logout: logout
};
