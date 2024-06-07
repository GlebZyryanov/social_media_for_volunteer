import React, { useContext, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { Context } from "../index";

const FindChats = () => {
  const { chat } = useContext(Context);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    chat.setSearchQuery(searchQuery);
  };

  return (
    <Container className="mt-3 d-flex flex-row align-items-center">
      <Form>
        <Form.Control
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </Form>
      <Button variant="outline-success" onClick={handleSearch}>
        Найти
      </Button>
    </Container>
  );
};

export default FindChats;
