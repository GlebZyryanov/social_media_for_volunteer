import React, { useState, useContext, useEffect } from "react";
import { Context } from "../../index";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { createEvent, getAllTypesEvents,getAllEvents } from "../../http/eventAPI"; 
import { Form, Button, Container } from "react-bootstrap";
import { ALLEVENTS_ROUTE } from "../../utils/consts";

const CreateEvent = observer(() => {
  const { event } = useContext(Context);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [info, setInfo] = useState("");
  const [expires_date, setExpiresDate] = useState("");
  const [type_event_id, setTypeEventId] = useState(1);
  const [image_path, setImagePath] = useState(null);
  
  useEffect(() => {
    getAllTypesEvents().then((data) => event.setTypes(data));
  }, [event]);
  console.log("type_evnet_id", type_event_id);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("address", address);
    formData.append("info", info);
    formData.append("expires_date", expires_date);
    formData.append("type_event_id", type_event_id);
    if(image_path) {
      formData.append("image_path", image_path);
    }

    try {
      await createEvent(formData);
      
      event.setEvents(await getAllEvents());
      navigate(ALLEVENTS_ROUTE); // Перенаправление на главную страницу или список мероприятий
    } catch (error) {
      console.error("Failed to create event:", error);
    }
  };

  return (
    <Container>
      <h2>Создание мероприятия</h2>
      <Form>
        <Form.Group controlId="formEventName">
          <Form.Label>Название мероприятия</Form.Label>
          <Form.Control
            type="text"
            placeholder="Введите название мероприятия"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formEventAddress">
          <Form.Label>Адрес мероприятия</Form.Label>
          <Form.Control
            type="text"
            placeholder="Введите адрес мероприятия"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formEventInfo">
          <Form.Label>Краткая информация</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Краткая информация"
            value={info}
            onChange={(e) => setInfo(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formEventExpiresDate">
          <Form.Label>Дата проведения</Form.Label>
          <Form.Control
            type="date"
            value={expires_date}
            onChange={(e) => setExpiresDate(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formEventType">
          <Form.Label>Тип мероприятия</Form.Label>
          <Form.Control
            as="select"
            value={type_event_id}
            onChange={(e) => setTypeEventId(e.target.value)}
            required
          >
            {event.types.map((type) => (
              <option key={type.type_event_id} value={type.type_event_id}>
                {type.name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="formEventImage">
          <Form.Label>Изображение</Form.Label>
          <Form.Control
            type="file"
            onChange={(e) => setImagePath(e.target.files[0])}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" onClick={handleSubmit}>
          Создать
        </Button>
      </Form>
    </Container>
  );
});

export default CreateEvent;
