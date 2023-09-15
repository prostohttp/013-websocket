module.exports = (req, res, next) => {
	if (req.cookies && req.cookies.userId) {
		req.auth = {
			userId: req.cookies.userId,
		};
	}
	next();
};
