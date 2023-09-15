const express = require("express");
const uiBooks = require("../api/uiBooksHandlers");

const uiBooksRouter = express.Router();

uiBooksRouter.get("/:id", uiBooks.get);
uiBooksRouter.get("/", uiBooks.getAll);
uiBooksRouter.get("/create", uiBooks.create);
uiBooksRouter.post("/", uiBooks.add);
uiBooksRouter.put("/:id", uiBooks.update);
uiBooksRouter.delete("/:id", uiBooks.delete);

module.exports = uiBooksRouter;
