import { Droppable } from "react-beautiful-dnd";
import { FC } from "react";

import styled from "styled-components";
import Card from "./Card";

export type IColumn = {
  name: string;
  items?: any[];
};

interface ColumnType {
  id: string;
  column: IColumn;
}

const Column: FC<ColumnType> = ({ id, column }) => {
  return (
    <ColumnContainer>
      <ColumnTitle>{column.name}</ColumnTitle>
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
              }}
            >
              {column.items?.map((item, i) => {
                return <Card item={item} index={i} />;
              })}
            </div>
          );
        }}
      </Droppable>
    </ColumnContainer>
  );
};

export default Column;

const ColumnContainer = styled.div`
  min-width: 300px;
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 8px 8px 8px 0;
  box-sizing: border-box;
`;

const ColumnTitle = styled.h2`
  text-align: center;
`;
