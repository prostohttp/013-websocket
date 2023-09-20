const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");
const { createServer } = require("http");
const { Server } = require("socket.io");

const notFound = require("./middleware/404");
const addAuthorizationHeader = require("./middleware/addAuthorizationHeader");
const userRouter = require("./routes/uiUserRouter");
const uiRouter = require("./routes/uiRouter");

const app = express();
const server = createServer(app);
const io = new Server(server);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(addAuthorizationHeader);

io.on("connection", (socket) => {
	const { id } = socket;
	console.log(`Socket connected ${id}`);

	socket.on("add-comment", (msg) => {
		socket.broadcast.emit("add-comment", msg);
		socket.emit("add-comment", msg);
	});

	socket.on("disconnect", () => {
		console.log(`Socket disconnected: ${id}`);
	});
});

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../", "src/views"));
app.use("/public", express.static(path.join(__dirname, "../", "public")));
app.use("/user", userRouter);
app.use("/", uiRouter);
app.use(notFound);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
	console.log(`Server started on port ${PORT}`);
});
