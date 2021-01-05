import styled from "styled-components";

import { DragDropContext, DropResult } from "react-beautiful-dnd";
import * as DNDActions from "../redux/actions";

import { useSelector, useDispatch } from "react-redux";

import Column from "../components/Column";

export default function Main() {
  const { columns } = useSelector((state) => state.dnd);

  const dipatch = useDispatch();

  const onDragEndHandler = (result: DropResult) => {
    if (!result.destination) return;
    dipatch(DNDActions.onDragEnd(result));
  };

  return (
    <MainContainer>
      <BoardName>TASKS</BoardName>
      <Filter>Filters</Filter>
      <Columns>
        <DragDropContext onDragEnd={onDragEndHandler}>
          {columns &&
            Object.entries(columns).map(([id, column]) => {
              return <Column id={id} column={column} />;
            })}
        </DragDropContext>
      </Columns>
    </MainContainer>
  );
}

const MainContainer = styled.main`
  display: grid;
  grid-template-rows: auto auto 1fr;
  padding: 0 16px;
  overflow-y: hidden;
`;

const Filter = styled.div``;

const BoardName = styled.div``;

const Columns = styled.div`
  box-sizing: border-box;
  display: flex;
  overflow-x: auto;
  scrollbar-width: none;
`;
