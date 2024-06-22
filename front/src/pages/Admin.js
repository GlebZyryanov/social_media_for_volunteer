import React, { useContext, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { Button, Form, Container, Row, Col } from "react-bootstrap";
import TypeBar from "../components/TypeBar";
import { createTypeEvent, deleteTypeEvent, getAllEvents, getAllTypesEvents } from "../http/eventAPI";

const Admin = observer(() => {
  const { event } = useContext(Context);
  const [typeName, setTypeName] = useState("");

  const handleCreateType = async () => {
    try {
      await createType({ name: typeName });
      setTypeName("");
    } catch (e) {
      console.error("Failed to create type:", e);
    }
  };

  const handleDeleteType = async () => {
    try {
      if (event.selectedType && event.selectedType.type_event_id ) {
        await deleteType(event.selectedType.type_event_id);
        event.setSelectedType(null);
      }
    } catch (e) {
      console.error("Failed to delete type:", e);
    }
  };


  useEffect(() => {
    getAllTypesEvents().then((data) => event.setTypes(data));
  }, [event]);

  const createType=async(type)=> {
    try {
      const newType = await createTypeEvent(type);
      event.setTypes([...event.types, newType]);
    } catch (e) {
      console.error("Failed to create type:", e);
    }
  }

  const deleteType=async(typeId)=> {
    try {
      await deleteTypeEvent(typeId);
      event.setTypes(event.types.filter(type => type.type_event_id !== typeId));
      event.setSelectedType({});
    } catch (e) {
      console.error("Failed to delete type:", e);
    }
  }

  return (
    <Container className="mt-3">
      <Row>
        <Col md={4}>
          <TypeBar />
          <Button
              variant="danger"
              onClick={handleDeleteType}
              className="ml-2"
              disabled={!event.selectedType || !event.selectedType.type_event_id}
              active={!!event.selectedType?.type_event_id}
            >
              Удалить выбранный тип
            </Button>
        </Col>
        <Col md={8}>
          <h4>Управление типами мероприятий</h4>
          <Form>
            <Form.Group>
              <Form.Label>Название типа</Form.Label>
              <Form.Control
                type="text"
                value={typeName}
                onChange={(e) => setTypeName(e.target.value)}
              />
            </Form.Group>
            <Button variant="success" onClick={handleCreateType} className="mt-2">
              Создать тип
            </Button>
            
          </Form>
        </Col>
      </Row>
    </Container>
  );
});

export default Admin;
