const express = require("express");
const router = express.Router();

const {
    createConversation,
    getAllConversations,
    getConversationById,
    deleteConversation
} = require("../controllers/conversationController");

router.post("/", createConversation);

router.get("/", getAllConversations);

router.get("/:id", getConversationById);

router.delete("/:id", deleteConversation);

module.exports = router;