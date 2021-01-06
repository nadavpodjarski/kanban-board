import { FC } from "react";
import { Draggable } from "react-beautiful-dnd";

import styled from "styled-components";

import { useDispatch } from "react-redux";
import * as DNDActions from "../redux/actions";

import { EditOutline } from "@styled-icons/evaicons-outline";
import { Delete } from "@styled-icons/material-outlined";

import { CardHeading } from "@styled-icons/bootstrap";

export type CardType = {
  id: string;
  content: string;
  createdAt: Date | number;
  updatedAt: Date | number;
};

interface ICard {
  item: CardType;
  index: number;
  boardId: string;
  columnId: string;
}

const Card: FC<ICard> = ({ item, index, boardId, columnId }) => {
  const dispatch = useDispatch();

  const onDeleteHandler = () => {
    dispatch(DNDActions.onDeleteCard(boardId, columnId, item.id));
  };

  return (
    <Draggable draggableId={item.id} index={index}>
      {(provided) => {
        return (
          <DraggableCard
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={{
              ...provided.draggableProps.style,
            }}
          >
            <CardIcon />
            <CardContent>{item.content}</CardContent>
            <CardActions>
              <DeleteButton onClick={onDeleteHandler} />
              <EditButton />
            </CardActions>
          </DraggableCard>
        );
      }}
    </Draggable>
  );
};

export default Card;

const DraggableCard = styled.div.attrs((props) => ({
  ...props,
}))`
  user-select: none;
  padding: 8px 8px 16px 8px;
  margin: 0 0 8px 0;
  min-height: 80px;
  background: white;
  color: grey;
  border-radius: 4px;
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 6px;
  width: 100%;
  box-sizing: border-box;
`;

const CardContent = styled.p`
  display: inline-block;
  overflow-wrap: break-word !important;
  word-break: break-all !important;
  white-space: normal !important;
  font-size: 14px;
  line-height: 1.4;
  padding: 0;
  margin: 0;
`;

const CardActions = styled.div`
  display: flex;
  flex-direction: column;
`;

const CardIcon = styled(CardHeading)`
  width: 18px;
  height: 18px;
  color: rgba(0, 0, 0, 0.6);
`;

const DeleteButton = styled(Delete)`
  width: 18px;
  height: 18px;
  color: rgba(0, 0, 0, 0.6);
  cursor: pointer;
  margin-bottom: 8px;
`;
const EditButton = styled(EditOutline)`
  width: 18px;
  height: 18px;
  color: rgba(0, 0, 0, 0.6);
  cursor: pointer;
`;
