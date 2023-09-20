const express = require("express");
const cors = require("../middleware/cors");
const uiComments = require("../api/uiCommentsHandlers");

const uiCommentsRouter = express.Router();

uiCommentsRouter.get("/add", cors, uiComments.add);
uiCommentsRouter.get("/:id", uiComments.getAll);
uiCommentsRouter.delete("/:id/delete", uiComments.delete);

module.exports = uiCommentsRouter;
