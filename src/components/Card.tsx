import { FC } from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

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
      {(provided) => {
        return (
          <CardContainer
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={{
              ...provided.draggableProps.style,
            }}
          >
            {item.content}
          </CardContainer>
        );
      }}
    </Draggable>
  );
};

export default Card;

const CardContainer = styled.div.attrs((props) => ({
  ...props,
}))`
  user-select: none;
  padding: 8px;
  margin: 0 0 8px 0;
  height: 80px;
  background: white;
  color: grey;
  border-radius: 4px;
`;
