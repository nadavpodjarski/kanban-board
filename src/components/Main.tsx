import styled from "styled-components";
import { useState, useEffect, useMemo } from "react";

import { DragDropContext, DropResult } from "react-beautiful-dnd";
import * as DNDActions from "../redux/actions";

import { useSelector, useDispatch } from "react-redux";

import { ColumnType } from "./Column";

import Column from "../components/Column";

export default function Main() {
  const dipatch = useDispatch();

  const { boards } = useSelector((state) => state.dnd);

  const [currentBoard, setCurrentBoard] = useState("");
  const [columns, setColumns] = useState<any>({});

  const boardOptions = useMemo(
    () =>
      Object.entries(boards).map(([id, { name }]) => ({
        id,
        name,
      })),
    [boards]
  );

  useEffect(() => {
    if (boardOptions.length) {
      const defaultBoard = boardOptions[0].id;
      setCurrentBoard(defaultBoard);
    }
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (currentBoard) {
      const columns = boards[currentBoard].columns;
      if (columns) setColumns(columns);
    }
    //eslint-disable-next-line
  }, [currentBoard]);

  const onSelectBoard = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setCurrentBoard(value);
  };

  const onDragEndHandler = (result: DropResult) => {
    if (!result.destination) return;
    dipatch(DNDActions.onDragEnd(result, currentBoard));
  };

  return (
    <MainContainer>
      <>
        {currentBoard && (
          <Select defaultValue={currentBoard} onChange={onSelectBoard}>
            {boardOptions.map((board) => {
              return <Option value={board.id}>{board.name}</Option>;
            })}
          </Select>
        )}
        <BoardName>{currentBoard && boards[currentBoard].name}</BoardName>
        <Columns>
          <DragDropContext onDragEnd={onDragEndHandler}>
            {columns &&
              Object.entries(columns).map(([id, column]) => {
                return (
                  <Column
                    id={id}
                    column={column as ColumnType}
                    key={id}
                    boardId={currentBoard}
                  />
                );
              })}
          </DragDropContext>
        </Columns>
      </>
    </MainContainer>
  );
}

const MainContainer = styled.main`
  display: grid;
  grid-template-rows: auto auto 1fr;
  padding: 0 16px;
  overflow-y: hidden;
`;

const BoardName = styled.div`
  text-align: center;
  font-size: 36px;
  font-weight: bold;
`;

const Columns = styled.div`
  box-sizing: border-box;
  display: flex;
  overflow-x: auto;
  scrollbar-width: none;
  height: 100%;
`;

const Select = styled.select`
  width: 200px;
  height: 42px;
`;

const Option = styled.option`
  background: white;
  color: black;
`;
