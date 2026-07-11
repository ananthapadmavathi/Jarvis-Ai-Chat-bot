const Conversation = require("../models/Conversation");
const generateResponse = require("../services/geminiService");

const sendMessage = async (req, res) => {
    try {
        const { conversationId, message } = req.body;

        if (!conversationId || !message) {
            return res.status(400).json({
                success: false,
                message: "Conversation ID and message are required."
            });
        }

        // Find the conversation
        const conversation = await Conversation.findById(conversationId);

        if (!conversation) {
            return res.status(404).json({
                success: false,
                message: "Conversation not found."
            });
        }

        // Save user message
        conversation.messages.push({
            role: "user",
            content: message
        });

        // Generate AI response
        const aiReply = await generateResponse(conversation.messages);

        // Save AI response
        conversation.messages.push({
            role: "assistant",
            content: aiReply
        });

        // Update title
        if (
            conversation.title === "New Chat" &&
            conversation.messages.length > 0
        ) {
            conversation.title = message.substring(0, 30);
        }

        // Save conversation
        await conversation.save();

        // Return response
        res.status(200).json({
            success: true,
            reply: aiReply,
            conversation
        });

    } catch (error) {

        console.error("Chat Controller Error:", error);

        // Handle Gemini overload
        if (error.status === 503) {
            return res.status(503).json({
                success: false,
                reply: "⚠️ Jarvis is currently busy due to high demand. Please try again in a few seconds."
            });
        }

        res.status(500).json({
            success: false,
            reply: "❌ Something went wrong. Please try again.",
            message: error.message
        });
    }
};

module.exports = {
    sendMessage
};