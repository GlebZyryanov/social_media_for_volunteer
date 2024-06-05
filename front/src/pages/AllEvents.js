import React from "react";
import NavBar from "../components/NavBar";
import { Col, Container, Row } from "react-bootstrap";
import TypeBar from "../components/TypeBar";
import EventList from "../components/EventList";



const AllEvents = () => {
  return (
    <Container className="mt-3 ">
        <Row className="d-flex ">
            <Col  md={3}>
            <TypeBar />
            </Col>
            <Col md={9}>
            <EventList />
            </Col>
        </Row>
    </Container>
  );
};

export default AllEvents;
