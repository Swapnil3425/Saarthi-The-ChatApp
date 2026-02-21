import { useContext, useEffect, useState } from 'react';
import { AuthContext } from './AuthContextOnly';
import toast from 'react-hot-toast';
import { ChatContext } from './ChatContextOnly';

export const ChatProvider = ({ children }) => {
    const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [unseenMessages, setUnseenMessages] = useState({});

    const { socket, axios } = useContext(AuthContext)


    // Function to get all users for sidebar
    const getUsers = async () => {
        try {
            const { data } = await axios.get("/api/messages/users");
            if (data.success) {
                setUsers(data.users);
                setUnseenMessages(data.unseenMessages);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    // Function to get messages for selected user
    const getMessages = async (userId) => {
        try {
            const { data } = await axios.get(`/api/messages/${userId}`);
            if (data.success) {
                setMessages(data.messages);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    // Function to send message to selected user
    const sendMessage = async (messageData) => {
        try {
            const { data } = await axios.post(`/api/messages/send/${selectedUser._id}`, messageData);

            if (data.success) {
                setMessages((prevMessages) => [...prevMessages, data.newMessage]);

                // Move selected user to the top of the users list
                setUsers((prevUsers) => {
                    const existingUsers = [...prevUsers];
                    const userIndex = existingUsers.findIndex(u => u._id === selectedUser._id);
                    if (userIndex > -1) {
                        const [user] = existingUsers.splice(userIndex, 1);
                        existingUsers.unshift(user);
                    }
                    return existingUsers;
                });
            }
            else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
        }
    };

    // Function to subscribe to messages for selected user
    const subscribeToMessages = async () => {
        if (!socket) return;

        socket.on("newMessage", (newMessage) => {
            // Move the sender to the top of the users list
            setUsers((prevUsers) => {
                const existingUsers = [...prevUsers];
                const senderIndex = existingUsers.findIndex(u => u._id === newMessage.senderId);
                if (senderIndex > -1) {
                    const [sender] = existingUsers.splice(senderIndex, 1);
                    existingUsers.unshift(sender);
                }
                return existingUsers;
            });

            if (selectedUser && newMessage.senderId === selectedUser._id) {
                newMessage.seen = true;
                setMessages((prevMessages) => [...prevMessages, newMessage]);
                axios.put(`/api/messages/mark/${newMessage._id}`);
            }
            else {
                setUnseenMessages((prevUnseenMessages) => ({
                    ...prevUnseenMessages,
                    [newMessage.senderId]:
                        prevUnseenMessages[newMessage.senderId]
                            ? prevUnseenMessages[newMessage.senderId] + 1
                            : 1,
                }));
            }
        });
    };


    // Function to unsubscribe from messages
    const unsubscribeFromMessages = () => {
        if (socket) socket.off("newMessage");
    };


    useEffect(() => {
        // Subscribe to messages when component mounts or dependencies change
        subscribeToMessages();

        // Unsubscribe when component unmounts or before re-subscribing
        return () => unsubscribeFromMessages();
    }, [socket, selectedUser]);


    const value = {
        messages,
        users,
        selectedUser,
        getUsers,
        getMessages,
        sendMessage,
        setSelectedUser,
        unseenMessages,
        setUnseenMessages,
    };

    return (
        <ChatContext.Provider value={value}>
            {children}
        </ChatContext.Provider>
    );
};
