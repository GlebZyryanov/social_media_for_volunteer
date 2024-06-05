import React from "react";
import NavBar from "../components/NavBar";
import { Col, Container, Row } from "react-bootstrap";

import FindUsers from "../components/FindUsers";
import UserList from "../components/UserList";



const AllEvents = () => {
  return (
    <Container className="mt-3 ">
        <Row className="d-flex ">
            <Col  md={3}>
            <FindUsers/>
            </Col>
            <Col md={9}>
            <UserList />
            </Col>
        </Row>
    </Container>
  );
};

export default AllEvents;
