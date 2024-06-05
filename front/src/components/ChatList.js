import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Context } from "../index";
import { Row, Col } from "react-bootstrap";
import ChatItem from "./ChatItem";

const ChatList = observer(() => {
  const { chat } = useContext(Context);
  return (
    <Row className="d-flex flex-column">
      {chat.chats.map((chat) => (
        <ChatItem key={chat.id} chat={chat} />
      ))}
    </Row>
  );
});

export default ChatList;
