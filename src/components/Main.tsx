import styled from "styled-components";
import { useState, useEffect, useMemo } from "react";

import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";
import * as Actions from "../redux/actions";

import { useSelector, useDispatch } from "react-redux";

import { ColumnType } from "./Column";
import Column from "../components/Column";
import AddColumn from "../components/AddColumn";

export default function Main() {
  const dipatch = useDispatch();

  const { boards } = useSelector((state) => state.app);

  const [currentBoard, setCurrentBoard] = useState("");
  const [columns, setColumns] = useState<Map<string, ColumnType>>();

  const boardOptions = useMemo(
    () =>
      Array.from(boards.entries()).map(([id, { name }]) => ({
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
      const columns = boards.get(currentBoard)?.columns;
      if (columns) setColumns(columns);
    }
    //eslint-disable-next-line
  }, [currentBoard, boards.entries()]);

  const onSelectBoard = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setCurrentBoard(value);
  };

  const onDragEndHandler = (result: DropResult) => {
    if (!result.destination) return;
    dipatch(Actions.onDragEnd(result, currentBoard));
  };

  return (
    <MainContainer>
      <BoardHeader>
        {currentBoard && (
          <>
            <SelectWrapper>
              <Label htmlFor="boards-select">Boards</Label>
              <Select
                id="boards-select"
                defaultValue={currentBoard}
                onChange={onSelectBoard}
              >
                {boardOptions.map((board) => {
                  return (
                    <Option key={board.id} value={board.id}>
                      {board.name}
                    </Option>
                  );
                })}
              </Select>
            </SelectWrapper>
            <BoardName>{boards.get(currentBoard)?.name}</BoardName>
          </>
        )}
      </BoardHeader>
      <DragDropContext onDragEnd={onDragEndHandler}>
        {currentBoard ? (
          <Droppable
            droppableId={currentBoard}
            type="DROPPABLE_BOARD"
            direction="horizontal"
          >
            {(provided) => {
              return (
                <Columns {...provided.droppableProps} ref={provided.innerRef}>
                  {columns &&
                    Array.from(columns.entries()).map(([id, column], index) => {
                      return (
                        <Column
                          index={index}
                          id={id}
                          column={column}
                          key={id}
                          boardId={currentBoard}
                        />
                      );
                    })}
                  {provided.placeholder}
                  <AddColumn boardId={currentBoard} />
                </Columns>
              );
            }}
          </Droppable>
        ) : null}
      </DragDropContext>
    </MainContainer>
  );
}

const MainContainer = styled.main`
  display: grid;
  grid-template-rows: auto 1fr;
  padding: 0 16px;
  overflow-y: hidden;
`;

const BoardHeader = styled.div`
  font-size: 36px;
  font-weight: bold;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
`;

const BoardName = styled.h2`
  margin: 0;
  text-align: center;
`;

const Columns = styled.div`
  box-sizing: border-box;
  display: flex;
  overflow-x: auto;
  scrollbar-width: none;
  flex-wrap: nowrap;
  height: 100%;
  width: 100%;
`;

const SelectWrapper = styled.div`
  position: relative;
  height: auto;
  width: auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Select = styled.select`
  width: 200px;
  height: 42px;
  background: rgba(0, 0, 0, 0.3);
  color: white;
  border: none;
  box-shadow: none;
  font-size: 18px;
`;

const Label = styled.label`
  font-size: 16px;
  margin-bottom: 6px;
`;

const Option = styled.option`
  background: white;
  color: black;
`;
