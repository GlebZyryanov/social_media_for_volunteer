import React from "react";
import { Card, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { CHATPAGE_ROUTE } from "../utils/consts";

const ChatItem = ({ chat }) => {
  const navigate = useNavigate();
  return (
    <Card
      className="mt-2 d-flex flex-row align-items-center"
      onClick={() => navigate(CHATPAGE_ROUTE + "/" + chat.chat_id)}
      style={{ cursor: "pointer", width: "100%", padding: "10px" }}
      border="light"
    >
      <div style={{ width: "100%" }}>
        <Card.Title>{chat.displayName}</Card.Title>

      </div>
    </Card>
  );
};

export default ChatItem;
