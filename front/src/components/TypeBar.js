import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { Context } from "../index";
import { Container, ListGroup } from "react-bootstrap";

const TypeBar = observer(() => {
  const { event } = useContext(Context);
  const [activeType, setActiveType] = useState(null);

  const handleTypeClick = (type) => {
    if (activeType && activeType.id === type.id) {
      setActiveType(null);
    } else {
      setActiveType(type);
    }
    event.setSelectedType(type);
  };

  return (
    <Container style={{ width: "100%", height: "100%", overflow: "auto"}}>
      <div>
        <h4 className="m-auto">Типы мероприятий</h4>
      </div>
      <ListGroup>
        {event.types.map((type) => (
          <ListGroup.Item
            
            style={{
              width: "100%",
              cursor: "pointer",
              transition: "transform 0.1s",
              transform: "scale(1)",
            }}
            active={activeType && activeType.id === type.id}
            onClick={() => handleTypeClick(type)}
            key={type.id}
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
