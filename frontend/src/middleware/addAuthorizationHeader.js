module.exports = (req, res, next) => {
  const userId = req.cookies.userId || undefined;
  req.userId = userId;
  next()
};
