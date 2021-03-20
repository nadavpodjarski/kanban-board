import styled from "styled-components";
import { useState, useEffect, useMemo } from "react";

import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";
import * as Actions from "../redux/actions";

import { useSelector, useDispatch } from "react-redux";

import Column from "../components/Column";
import AddColumn from "../components/AddColumn";

export default function Main() {
  const dipatch = useDispatch();

  const {
    boards: [...boards],
  } = useSelector((state) => state.app);

  const [currentBoardID, setCurrentBoardID] = useState<any>();

  const parsedBoards = useMemo(
    () =>
      boards.reduce((acc: { [key: string]: any }, [id, { name, columns }]) => {
        acc[id] = {
          name,
          columns,
        };
        return acc;
      }, {}),
    [boards]
  );

  const onSelectBoard = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setCurrentBoardID(e.target.value);

  const onDragEndHandler = (result: DropResult) =>
    result.destination && dipatch(Actions.onDragEnd(result, currentBoardID));

  useEffect(() => {
    const defaultBoardID = boards[0][0];
    setCurrentBoardID(defaultBoardID);
    // eslint-disable-next-line
  }, []);

  return (
    <MainContainer>
      <BoardHeader>
        <>
          <SelectWrapper>
            <Label htmlFor="boards-select">Boards</Label>
            <Select
              id="boards-select"
              defaultValue={currentBoardID}
              onChange={onSelectBoard}
            >
              {Object.entries(parsedBoards).map(([id, { name }]) => {
                return (
                  <Option key={id + name} value={id}>
                    {name}
                  </Option>
                );
              })}
            </Select>
          </SelectWrapper>
          <BoardName>{parsedBoards[currentBoardID]?.name}</BoardName>
        </>
      </BoardHeader>
      <DragDropContext onDragEnd={onDragEndHandler}>
        {currentBoardID ? (
          <Droppable
            droppableId={currentBoardID}
            type="DROPPABLE_BOARD"
            direction="horizontal"
          >
            {(provided) => {
              return (
                <Columns {...provided.droppableProps} ref={provided.innerRef}>
                  {[...parsedBoards[currentBoardID].columns].map(
                    ([id, column], index) => {
                      return (
                        <Column
                          index={index}
                          id={id}
                          column={column}
                          key={id}
                          boardId={currentBoardID}
                        />
                      );
                    }
                  )}
                  {provided.placeholder}
                  <AddColumn boardId={currentBoardID} />
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
