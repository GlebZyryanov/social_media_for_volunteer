import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { upgradeRole } from '../http/authAPI';
import { observer } from 'mobx-react-lite';
import {Button, Card, Container, Form} from "react-bootstrap";

const UpgradeRole = observer(() => {
  const { id } = useParams(); // Извлечение userID из параметров URL
  console.log(useParams)
  const [adminPassword, setAdminPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleUpgradeRole = async () => {
    try {
      setError("");
      const response = await upgradeRole(id, adminPassword);
      setSuccess("Роль успешно повышена до администратора!");
      console.log("Upgrade response:", response);
    } catch (e) {
      setError("Не удалось повысить роль. Проверьте admin_password и повторите попытку.");
      console.error("Failed to upgrade role:", e);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center"
               style={{ height: window.innerHeight - 85 }}>
      <Card style={{ width: 600, fontFamily: "Montserrat" }} className="p-5">
      <Card.Text>Повышение роли до администратора</Card.Text>
      <Form>
        <Form.Group controlId="formAdminPassword">

          <Form.Control
            type="password"
            placeholder="admin_password"
            value={adminPassword}
            onChange={(e) => setAdminPassword(e.target.value)}
          />
        </Form.Group>
      </Form>
      <Button  className="mt-3 align-self-center "
               variant="outline-success"
               style={{ fontFamily: "Montserrat" }} onClick={handleUpgradeRole}>Повысить роль</Button>
      {error && <div style={{ color: "red" }}>{error}</div>}
      {success && <div style={{ color: "green" }}>{success}</div>}
    </Card>
    </Container>
  );
});

export default UpgradeRole;
