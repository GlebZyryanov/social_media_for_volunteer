import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { Context } from "../index";
import { Container, ListGroup } from "react-bootstrap";
import { fetchTypes } from "../http/eventAPI";

const TypeBar = observer(() => {
  const { event } = useContext(Context);
  const [activeType, setActiveType] = useState(null);

  const handleTypeClick = (type) => {
    if (event.selectedType && event.selectedType.type_event_id === type.type_event_id) {
      setActiveType(null);
      event.setSelectedType(null);
    } else {
      setActiveType(type);
      event.setSelectedType(type);
    }
  };
  


  return (
    <Container style={{ width: "100%", height: "100%", overflow: "auto" }}>
      <div>
        <h4 className="m-auto">Типы мероприятий</h4>
      </div>
      <ListGroup>
        {event.types.map((type) => (
          <ListGroup.Item
            key={type.id}
            style={{
              width: "100%",
              cursor: "pointer",
              transition: "transform 0.1s",
              transform: "scale(1)",
            }}
            active={type.type_event_id === event.selectedType?.type_event_id}
            
            onClick={() => handleTypeClick(type)}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "scale(1.03)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            {type.name}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
});

export default TypeBar;
