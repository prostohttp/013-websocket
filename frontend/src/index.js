const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");

const notFound = require("./middleware/404");
const addAuthorizationHeader = require("./middleware/addAuthorizationHeader");
const userRouter = require("./routes/uiUserRouter");
const uiRouter = require("./routes/uiRouter");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(addAuthorizationHeader);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../", "src/views"));
app.use("/public", express.static(path.join(__dirname, "../", "public")));
app.use("/user", userRouter);
app.use("/", uiRouter);
app.use(notFound);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server started on port ${PORT}`);
});
