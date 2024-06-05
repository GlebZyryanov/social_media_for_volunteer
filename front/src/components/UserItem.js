import React from "react";
import { Card, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { USERPAGE_ROUTE } from "../utils/consts";

const UserItem = ({ user }) => {
  const navigate = useNavigate();
  return (
    <Card
      className="mt-2 d-flex flex-row align-items-center"
      onClick={() => navigate(USERPAGE_ROUTE + "/" + user.id)}
      style={{ cursor: "pointer", width: "100%", padding: "10px" }}
      border="light"
    >
      <Image
        src={user.image_path}
        roundedCircle
        style={{ width: "60px", height: "60px", marginRight: "10px" }}
      />
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <Card.Title style={{ fontSize: "1.5rem", marginRight: "10px" }}>
            {user.name}
          </Card.Title>
          <Card.Title style={{ fontSize: "1.5rem" }}>{user.surname}</Card.Title>
        </div>
        <Card.Text style={{ marginBottom: "5px" }}>{user.email}</Card.Text>
        <Card.Text style={{ color: user.isActive ? "green" : "red" }}>
          {user.isActive ? "В сети" : "Вне сети"}
        </Card.Text>
      </div>
    </Card>
  );
};

export default UserItem;
