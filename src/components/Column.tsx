import { Droppable } from "react-beautiful-dnd";
import { FC, useState } from "react";

import styled from "styled-components";
import Card from "./Card";
import AddCard from "./AddCard";

import { Add } from "@styled-icons/ionicons-solid";
import { ThreeDots } from "@styled-icons/bootstrap";

export type ColumnType = {
  name: string;
  items: any[];
};

interface IColumn {
  id: string;
  column: ColumnType;
}

const Column: FC<IColumn> = ({ id, column }) => {
  const [isAddCard, setIsAddCard] = useState(false);

  const toggleAddCard = () => {
    setIsAddCard((prevState) => !prevState);
  };

  return (
    <ColumnContainer>
      <ColumnHeader>
        <ColumnTitle>{column.name}</ColumnTitle>
        <AddButton onClick={toggleAddCard} />
        <MenuButton />
      </ColumnHeader>
      <Droppable droppableId={id} key={id}>
        {(provided, snapshot) => {
          return (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={{
                background: snapshot.isDraggingOver
                  ? "rgba(0,0,0,0.3)"
                  : "rgba(0,0,0,0.1)",
                width: "100%",
                flex: 1,
                padding: 8,
                boxSizing: "border-box",
                overflowY: "auto",
                transition: "background 300ms linear",
                scrollbarWidth: "none",
              }}
            >
              {isAddCard && <AddCard />}
              {column.items?.map((item, i) => {
                return <Card item={item} index={i} />;
              })}
              <div {...provided.placeholder} />
            </div>
          );
        }}
      </Droppable>
    </ColumnContainer>
  );
};

export default Column;

const ColumnContainer = styled.div`
  min-width: 350px;
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 8px 8px 8px 0;
  box-sizing: border-box;
`;

const ColumnHeader = styled.div`
  text-align: center;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 24px 0;
`;

const ColumnTitle = styled.span`
  flex: 1;
  font-size: 24px;
  font-weight: bold;
`;

const AddButton = styled(Add)`
  color: rgba(0, 0, 0, 0.8);
  width: 20px;
  cursor: pointer;
  &:hover {
    color: white;
  }
`;

const MenuButton = styled(ThreeDots)`
  width: 18px;
  color: rgba(0, 0, 0, 0.8);
  margin-left: 8px;
  cursor: pointer;
`;
