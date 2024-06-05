import React from "react";
import { Button, Container, Form, } from "react-bootstrap";

const FindChats = () => {
  

    return (
     <Container className="mt-3 d-flex flex-row align-items-center" >
        <Form>
            <Form.Control type="text" placeholder="Search"/>
        </Form>
        <Button variant="outline-success">Найти</Button>
     </Container>
    )
  }
  
  export default FindChats;
  