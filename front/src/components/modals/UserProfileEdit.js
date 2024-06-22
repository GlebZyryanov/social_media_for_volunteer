import React, { useContext, useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';

import { observer } from 'mobx-react-lite';
import { Context } from '../../index';
import { updateUser } from '../../http/authAPI';
import { useNavigate } from 'react-router-dom';
import { USERPAGE_ROUTE } from '../../utils/consts';

const UserProfileEdit = observer(() => {
  const { user } = useContext(Context);
  const [name, setName] = useState(user.user.name);
  const [surname, setSurname] = useState(user.user.surname);
  const [email, setEmail] = useState(user.user.email);
  const [profile, setProfile] = useState(user.user.profile);
  const [phone, setPhone] = useState(user.user.phone);
  const [password, setPassword] = useState('');
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const selectFile = (e) => {
    setImage(e.target.files[0]);
  };

  const saveChanges = async () => {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('surname', surname);
    //formData.append('email', email);
    formData.append('profile', profile);
    formData.append('phone', phone);
    formData.append('password', password);
    if (image) {
      formData.append('image_path', image);
    }

    try {
      await updateUser(user.user.user_id, formData);
      navigate(USERPAGE_ROUTE + "/" + user.user.user_id)
    } catch (error) {
      console.error('Failed to update user:', error);
    }
  };

  const cancelChanges = () => {
   
    navigate(USERPAGE_ROUTE + "/" + user.user.user_id)
  };

  return (
    <Card className="p-3">
      <h2>Редактирование профиля</h2>
      <Form>
        <Form.Group controlId="formName">
          <Form.Label>Имя</Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formSurname">
          <Form.Label>Фамилия</Form.Label>
          <Form.Control
            type="text"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            disabled={true}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formProfile">
          <Form.Label>Профиль</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={profile}
            onChange={(e) => setProfile(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formPhone">
          <Form.Label>Телефон</Form.Label>
          <Form.Control
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formPassword">
          <Form.Label>Пароль</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formImage">
          <Form.Label>Изображение</Form.Label>
          <Form.Control type="file" onChange={selectFile} />
        </Form.Group>
        <Button variant="primary" onClick={saveChanges}>
          Сохранить
        </Button>
        <Button variant="secondary" onClick={cancelChanges} className="ml-2">
          Отмена
        </Button>
      </Form>
    </Card>
  );
});

export default UserProfileEdit;
