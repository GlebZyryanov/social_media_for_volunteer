import React from "react";
import NavBar from "../components/NavBar";
import { Col, Container, Row } from "react-bootstrap";

import FindChats from "../components/FindChats";
import ChatList from "../components/ChatList";



const AllEvents = () => {
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

export default AllEvents;
