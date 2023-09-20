const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../model/User");

const verify = async (userLogin, userPassword, done) => {
	try {
		const user = await User.findOne({ userLogin, userPassword }).exec();
		if (!user) {
			return done(null, false);
		}
		if (user) {
			return done(null, user);
		}
	} catch (error) {
		return done(error, false);
	}
};

const options = {
	usernameField: "userLogin",
	passwordField: "userPassword",
};

passport.use("local", new LocalStrategy(options, verify));

passport.serializeUser((user, cb) => {
	cb(null, user._id.toString());
});

passport.deserializeUser(async (id, cb) => {
	const user = await User.findById(id).exec();
	console.log("deserializeUser", user);
	if (!user) {
		cb({ error: "Такой пользователь не найден" });
	} else {
		cb(null, user);
	}
});

module.exports = passport;
