const { Router } = require("express");
const messageController = require("../controllers/messageController");
const messageRouter = Router();

messageRouter.get("/new", messageController.createMessageGet);
messageRouter.post("/new", messageController.createMessagePost);
messageRouter.post("/delete", messageController.deleteMessagePost);

module.exports = messageRouter;