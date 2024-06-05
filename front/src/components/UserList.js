import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Context } from "../index";
import { Row, Col } from "react-bootstrap";
import UserItem from "./UserItem";

const UserList = observer(() => {
  const { user } = useContext(Context);
  if(!user){
    const isUser = false;
  }
  return (  
    <Row className="d-flex flex-column">
      {user.users.map((user) => (
        <UserItem key={user.id} user={user} />
      ))}
    </Row>
  );
});

export default UserList;
