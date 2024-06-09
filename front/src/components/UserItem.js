import React from "react";
import { Card, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { USERPAGE_ROUTE } from "../utils/consts";
import defaultImage from '../defaultImgStore/defaultimg.jpg';
const UserItem = ({ user }) => {
  const navigate = useNavigate();
  console.log(`Image path for user ${user.user_id}: ${user.image_path}`);
  return (
    <Card
      className="mt-2 d-flex flex-row align-items-center"
      onClick={() => navigate(USERPAGE_ROUTE + "/" + user.user_id)}
      style={{ cursor: "pointer", width: "100%", padding: "10px" }}
      border="light"
    >
      <Image
        src={`${process.env.REACT_APP_API_URL}/${user.image_path}`}
        roundedCircle
        style={{ width: "60px", height: "60px", marginRight: "10px" }}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = defaultImage;
        }}
      />
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <Card.Title style={{ fontSize: "1.5rem", marginRight: "10px" }}>
            {user.name}
          </Card.Title>
          <Card.Title style={{ fontSize: "1.5rem" }}>{user.surname}</Card.Title>
        </div>
        <Card.Text style={{ marginBottom: "5px" }}>{user.email}</Card.Text>
        {user.role==="ADMIN"&&<Card.Text>Администратор</Card.Text>}
        <Card.Text style={{ color: user.isActive ? "green" : "red" }}>
          {user.isActive ? "В сети" : "Вне сети"}
        </Card.Text>

      </div>
    </Card>
  );
};

export default UserItem;
