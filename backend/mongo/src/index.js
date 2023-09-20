const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const passport = require("./api/passport");
const apiBooksRouter = require("./routes/apiBookRouter");
const uiBooksRouter = require("./routes/uiBookRouter");
const apiUserRouter = require("./routes/apiUserRouter");
const uiUserRouter = require("./routes/uiUserRouter");
const uiCommentsRouter = require("./routes/uiCommentsRouter");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
	session({
		secret: "SECRET",
		resave: false,
		saveUninitialized: false,
	})
);

app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

app.use("/books", uiBooksRouter);
app.use("/api/user", apiUserRouter);
app.use("/api/books", apiBooksRouter);
app.use("/user", uiUserRouter);
app.use("/comments", uiCommentsRouter)

const start = async (port, url) => {
	await mongoose.connect(url, {
		dbName: "books",
	});
	await mongoose.connect(url, {
		dbName: "users",
	});
	await mongoose.connect(url, {
		dbName: "comments",
	});
	app.listen(port, () => {
		console.log(`Server started on port ${port}`);
	});
};

const PORT = process.env.PORT || 3334;
const URL_DB = process.env.URL_DB || "mongodb://root:example@mongo:27017/";
start(PORT, URL_DB);
