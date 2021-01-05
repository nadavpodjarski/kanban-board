import { FC } from "react";
import { Draggable } from "react-beautiful-dnd";

interface ICard {
  item: {
    id: string;
    content: string;
  };
  index: number;
}

const Card: FC<ICard> = ({ item, index }) => {
  return (
    <Draggable key={item.id} draggableId={item.id} index={index}>
      {(provided, snapshot) => {
        return (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={{
              ...provided.draggableProps.style,
              userSelect: "none",
              padding: 16,
              margin: "0 0 8px 0",
              minHeight: "50px",
              background: "white",
              color: "grey",
              borderRadius: 4,
            }}
          >
            {item.content}
          </div>
        );
      }}
    </Draggable>
  );
};

export default Card;
