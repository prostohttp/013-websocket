const express = require("express");
const session = require("express-session");
const passport = require("./api/passport");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const apiBooksRouter = require("./routes/apiBookRouter");
const uiBooksRouter = require("./routes/uiBookRouter");
const apiUserRouter = require("./routes/apiUserRouter");
const uiUserRouter = require("./routes/uiUserRouter");
const corsMiddleware = require("./middleware/cors");
const authMiddleware = require("./middleware/auth");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
	session({
		secret: "SECRET",
	})
);

app.use(cookieParser());
app.use(corsMiddleware);
app.use(authMiddleware);
app.use(passport.initialize());
app.use(passport.session());

app.use("/api/books", apiBooksRouter);
app.use("/api/user", apiUserRouter);
app.use("/books", uiBooksRouter);
app.use("/user", uiUserRouter);

const start = async (port, url) => {
	await mongoose.connect(url, {
		dbName: "books",
	});
	await mongoose.connect(url, {
		dbName: "users",
	});
	app.listen(port, () => {
		console.log(`Server started on port ${port}`);
	});
};

const PORT = process.env.PORT || 3334;
const URL_DB = process.env.URL_DB || "mongodb://root:example@mongo:27017/";
start(PORT, URL_DB);
