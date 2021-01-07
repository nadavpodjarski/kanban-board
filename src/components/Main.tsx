import styled from "styled-components";
import { useState, useEffect, useMemo } from "react";

import { DragDropContext, DropResult } from "react-beautiful-dnd";
import * as DNDActions from "../redux/actions";

import { useSelector, useDispatch } from "react-redux";

import { ColumnType } from "./Column";
import Column from "../components/Column";
import AddColumn from "../components/AddColumn";

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
              <BoardName>{boards[currentBoard]?.name}</BoardName>
            </>
          )}
        </BoardHeader>
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
          <AddColumn boardId={currentBoard} />
        </Columns>
      </>
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
  height: 100%;
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
