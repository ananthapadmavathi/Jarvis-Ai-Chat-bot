const Conversation = require("../models/Conversation");

// Create a new conversation
const createConversation = async (req, res) => {
    try {
        const conversation = await Conversation.create({
            title: "New Chat",
            messages: []
        });

        res.status(201).json({
            success: true,
            conversation
        });

    } catch (error) {
        console.error("Create Conversation Error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to create conversation."
        });
    }
};

// Get all conversations
const getAllConversations = async (req, res) => {
    try {

        const conversations = await Conversation.find()
            .sort({ updatedAt: -1 });

        res.status(200).json({
            success: true,
            conversations
        });

    } catch (error) {

        console.error("Get Conversations Error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch conversations."
        });

    }
};

// Get one conversation
const getConversationById = async (req, res) => {

    try {

        const conversation = await Conversation.findById(req.params.id);

        if (!conversation) {

            return res.status(404).json({
                success: false,
                message: "Conversation not found."
            });

        }

        res.status(200).json({
            success: true,
            conversation
        });

    } catch (error) {

        console.error("Get Conversation Error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch conversation."
        });

    }

};

// Delete conversation
const deleteConversation = async (req, res) => {

    try {

        const conversation = await Conversation.findByIdAndDelete(req.params.id);

        if (!conversation) {

            return res.status(404).json({
                success: false,
                message: "Conversation not found."
            });

        }

        res.status(200).json({
            success: true,
            message: "Conversation deleted successfully."
        });

    } catch (error) {

        console.error("Delete Conversation Error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to delete conversation."
        });

    }

};

module.exports = {
    createConversation,
    getAllConversations,
    getConversationById,
    deleteConversation
};