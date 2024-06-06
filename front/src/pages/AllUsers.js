import React, { useContext, useEffect } from "react";
import NavBar from "../components/NavBar";
import { Col, Container, Row } from "react-bootstrap";

import FindUsers from "../components/FindUsers";
import UserList from "../components/UserList";
import { getAllUsers } from "../http/authAPI";
import { Context } from "../index";




const AllUsers = () => {
  const { user } = useContext(Context);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const users = await getAllUsers();
        user.setUsers(users); // Сохраняем пользователей в UserStore
        console.log(users);
      } catch (e) {
        console.error("Failed to fetch users:", e);
      }
    };

    fetchUsers();
  }, [user]);
  
 
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

export default AllUsers;
