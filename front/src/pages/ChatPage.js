import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../index";
import {Card, Button, Form, Container, Row, Col} from "react-bootstrap";
import {
  joinChat,
  sendMessage,
  leaveChat,
  onMessageReceived,
  disconnectSocket,
} from "../socket/socket";

import { getChatByID, getChatMessages } from "../http/chatAPI";

const ChatPage = () => {
  const { id } = useParams();
  const { user,chat  } = useContext(Context);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [chatInfo, setChatInfo] = useState("");
  
  const loadChatInfo = async () => {
    try {
      const response = await getChatByID(id);
      console.log("Chat info response:", response); // Логирование данных
      setChatInfo(response);
    } catch (error) {
      console.error("Failed to load chat info:", error);
    }
  };
  

 useEffect(() => {
    joinChat(id);
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
    loadChatInfo();
    const messageHandler = (message) => {
      console.log("New message received:", message); // Логирование новых сообщений
      setMessages((prevMessages) => [...prevMessages, message]);
    };
    onMessageReceived(messageHandler)
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
    console.log("Sending message:", message); // Логирование отправляемого сообщения
    sendMessage(id, message);
    setNewMessage("");
  };    
console.log("user.user.user_id",user.user.user_id)
console.log("messages",messages)
console.log("chatInfo",chatInfo.displayName)

  return (
    <Container className="mt-3">
        <Row className="d-flex">
            <Col md={3}>
                <Card>
                    <Card.Body>
                        <Card.Title>{chatInfo.displayName}</Card.Title>
                    </Card.Body>
                </Card>
            </Col>
            <Col md={9}>
                <Card>
                    <Card.Body>
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
            </Col>
        </Row>
    </Container>
  );
};

export default ChatPage;
