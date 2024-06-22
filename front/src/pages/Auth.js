import React, { useContext, useEffect, useState } from "react";
import { Button, Card, Container, Form,FormControl } from "react-bootstrap";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  LOGIN_ROUTE,
  REGISTRATION_ROUTE,
  ALLEVENTS_ROUTE,
} from "../utils/consts";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { login, registration } from "../http/authAPI";
import { useSearchParams } from "react-router-dom";

const Auth = observer(() => {
  const { user } = useContext(Context);
  const location = useLocation(); 
  const navigate = useNavigate();
  const isLogin = location.pathname === LOGIN_ROUTE;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);

  const [searchParams] = useSearchParams();
  const emailToken = searchParams.get("token");

  const confirmEmail = async (token) => {
    try {
      const response = await fetch(`/api/confirm-email?token=${token}`);
      const data = await response.json();
      if (response.ok) {
        alert(data.message);
      } else {
        alert(data.error);
      }
    } catch (e) {
      console.log("Failed to confirm email");
    }
  };

  const click = async () => {
    try {
      let data;
      if (isLogin) {
        data = await login(email, password);
      } else {
        data = await registration(name, email, password);
      }
      user.setUser(data);
      user.setIsAuth(true);
      if (emailToken) {
        confirmEmail(emailToken);
        console.log("emailToken", emailToken);
      }

      navigate(ALLEVENTS_ROUTE);
    } catch (e) {
      console.error("Auth error:", e);
      if (e.response && e.response.data && e.response.data.message) {
        alert(e.response.data.message);
      } else {
        alert("An unexpected error occurred");
      }
    }
  };

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    setIsEmailValid(e.target.validity.valid);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEmailValid) {
      console.log("Валидный email:", email);
    } else {
      alert("Пожалуйста, введите действительный email-адрес.");
    }
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ height: window.innerHeight - 85 }}
    >
      <Card style={{ width: 600, fontFamily: "Montserrat" }} className="p-5">
        <h2 className="m-auto">{isLogin ? "Авторизация" : "Регистрация"}</h2>
        <Form
          className="d-flex flex-column"
          style={{ fontFamily: "Montserrat" }}
        >
          {isLogin ? (
            <Form>
              <Form.Control
                className="mt-3"
                placeholder="Введите ваш email"
                type="email"
                value={email}
                isInvalid={!isEmailValid}
                onChange={handleEmailChange}
              />
              <Form.Control.Feedback type="invalid">
                Пожалуйста, введите email-адрес
              </Form.Control.Feedback>
              <Form.Control
                className="mt-3"
                placeholder="Введите ваш пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
              />
            </Form>
          ) : (
            <Form>
              <Form.Control
                className="mt-3"
                placeholder="Введите ваш email"
                type="email"
                value={email}
                isInvalid={!isEmailValid}
                onChange={handleEmailChange}
              />
              <Form.Control.Feedback type="invalid">
                Пожалуйста, введите email-адрес
              </Form.Control.Feedback>
              <div
                style={{
                  fontFamily: "Montserrat",
                  color: "red",
                  opacity: "0.8",
                  fontSize: "11px",
                  textAlign: "center",
                }}
              >
                Почту необязательно подтверждать, в случае ошибки в почте
                уведомления приходить не будут
              </div>
              <Form.Control
                className="mt-3"
                placeholder="Как вас зовут?"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Form.Control
                className="mt-3"
                placeholder="Введите ваш пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
              />
            </Form>
          )}
          <Button
            className="mt-3 align-self-center "
            variant="outline-success"
            style={{ fontFamily: "Montserrat" }}
            onClick={click}
          >
            {isLogin ? "Войти" : "Регистрация"}
          </Button>

          {isLogin ? (
            <div
              className="align-self-center "
              style={{ fontFamily: "Montserrat" }}
            >
              Нет аккаунта?
              <NavLink
                to={REGISTRATION_ROUTE}
                style={{
                  textDecoration: "none",
                  marginLeft: 3,
                  fontFamily: "Montserrat",
                }}
              >
                Регистрация!
              </NavLink>
            </div>
          ) : (
            <div
              className="align-self-center "
              style={{ fontFamily: "Montserrat" }}
            >
              Есть аккаунт?
              <NavLink
                to={LOGIN_ROUTE}
                style={{ textDecoration: "none", marginLeft: 3 }}
              >
                Войти!
              </NavLink>
            </div>
          )}
        </Form>
      </Card>
    </Container>
  );
});

export default Auth;
