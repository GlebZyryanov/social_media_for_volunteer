import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../index";
import { Card, Button, Form } from "react-bootstrap";
import {
  joinChat,
  sendMessage,
  leaveChat,
  onMessageReceived,
  disconnectSocket,
} from "../socket/socket";
import axios from "axios";
import { getChatMessages } from "../http/chatAPI";

const ChatPage = () => {
  const { id } = useParams();
  const { user } = useContext(Context);
  const { chat } = useContext(Context);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  

 useEffect(() => {
    // Join the chat via socket.io
    joinChat(id);

    // Load chat messages from the server
    const loadMessages = async () => {
      try {
        // const response = await axios.get(`${process.env.REACT_APP_API_URL}api/chats/messages/${id}`);
        const messageData = await getChatMessages(id);
        setMessages(messageData);
      } catch (error) {
        console.error("Failed to load messages:", error);
      }
    };

    loadMessages();

    // Listen for new messages via socket.io
    onMessageReceived((message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      leaveChat(id);
      disconnectSocket();
    };
  }, [id]);

  const handleSendMessage = () => {
    const message = {
      userId: user.user.user_id,
      chatId: id,
      text: newMessage,
      timestamp: new Date().toISOString(),
    };

    sendMessage(id, message);
    setNewMessage("");
  };    
console.log("user.user.user_id",user.user.user_id)
console.log("messages",messages)

  return (
    <div>
      <Card>
        <Card.Body>
          <Card.Title>Название чата - изменить позже чтобы добавлялось из названия чата с сервера</Card.Title>
          <div>
            {messages.map((message, index) => (
              <div key={index}>
                <strong>{message.user.name}</strong>: {message.message_text}
              </div>
            ))}
          </div>
          <Form.Control
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
          />
          <Button onClick={handleSendMessage}>Send</Button>
        </Card.Body>
      </Card>
    </div>  
  );
};

export default ChatPage;
