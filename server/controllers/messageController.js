import Message from "../models/Message.js";
import User from "../models/User.js";
import cloudinary from "../lib/cloudinary.js";
import { io, userSocketMap } from "../server.js";


// Get all users except the logged in user
export const getUsersForSidebar = async (req, res) => {
    try {
        const userId = req.user._id;
        const filteredUsers = await User.find({ _id: { $ne: userId } }).select("-password"); // ne means not equal to

        const unseenMessages = {};
        const usersWithLastMessageTime = [];

        const promises = filteredUsers.map(async (user) => {
            // 1. Check for unseen messages
            const unseenMsgs = await Message.countDocuments({
                senderId: user._id,
                receiverId: userId,
                seen: false
            });

            if (unseenMsgs > 0) {
                unseenMessages[user._id] = unseenMsgs;
            }

            // 2. Find the latest message exchanged between the two users
            const latestMessage = await Message.findOne({
                $or: [
                    { senderId: userId, receiverId: user._id },
                    { senderId: user._id, receiverId: userId }
                ]
            }).sort({ createdAt: -1 });

            const lastMessageTime = latestMessage ? new Date(latestMessage.createdAt).getTime() : 0;

            usersWithLastMessageTime.push({
                ...user.toObject(),
                lastMessageTime
            });
        });

        await Promise.all(promises);

        // Sort users so that the ones with the most recent messages are at the very top
        usersWithLastMessageTime.sort((a, b) => b.lastMessageTime - a.lastMessageTime);

        res.json({ success: true, users: usersWithLastMessageTime, unseenMessages })
    }
    catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }
};


// Get all messages for selected user
export const getMessages = async (req, res) => {
    try {

        const { id: selectedUserId } = req.params; // extracts the id from req.params and renames it to selectedUserId, 
        // req.params contains route parameters from the URL.
        const myId = req.user._id; // req.user is typically set by authentication middleware

        const messages = await Message.find({
            $or: [ // $or means logical OR
                { senderId: myId, receiverId: selectedUserId },
                { senderId: selectedUserId, receiverId: myId },
            ]
        });

        await Message.updateMany({ senderId: selectedUserId, receiverId: myId }, { seen: true });
        res.json({ success: true, messages })
    }
    catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }
};


// api to mark message as seen using message id
export const markMessageAsSeen = async (req, res) => {
    try {
        const { id } = req.params;
        await Message.findByIdAndUpdate(id, { seen: true });
        res.json({ success: true });
    }
    catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
};


// Send message to selected user
export const sendMessage = async (req, res) => {
    try {
        const { text, image } = req.body;
        const receiverId = req.params.id;
        const senderId = req.user._id;

        let imageUrl;
        if (image) {
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }

        const newMessage = await Message.create({
            senderId,
            receiverId,
            text,
            image: imageUrl
        });

        // Emit the new message to receiver's socket
        const receiverSocketId = userSocketMap[receiverId];
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", newMessage)
        }

        res.json({ success: true, newMessage });

    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}
