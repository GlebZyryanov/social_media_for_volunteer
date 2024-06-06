import React, { useContext, useEffect } from "react";
import NavBar from "../components/NavBar";
import { Col, Container, Row } from "react-bootstrap";

import FindChats from "../components/FindChats";
import ChatList from "../components/ChatList";
import { getAllChats } from "../http/chatAPI";
import { Context } from "../index";


const AllChats = () => {
  const { chat } = useContext(Context);
  
useEffect(() => {
  const fetchChats = async () => {
    try {
      const chats = await getAllChats();
      chat.setChats(chats); // Сохраняем пользователей в UserStore
      console.log(chats);
    } catch (e) {
      console.error("Failed to fetch chats:", e);
    }
  };

  fetchChats();
}, [chat]);

  return (
    <Container className="mt-3 ">
        <Row className="d-flex ">
            <Col  md={3}>
            <FindChats/>
            </Col>
            <Col md={9}>
            <ChatList />
            </Col>
        </Row>
    </Container>
  );
};

export default AllChats;
