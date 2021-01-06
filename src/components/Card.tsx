import { FC } from "react";
import { Draggable } from "react-beautiful-dnd";

import styled from "styled-components";

import { useDispatch } from "react-redux";
import * as DNDActions from "../redux/actions";

import { EditOutline } from "@styled-icons/evaicons-outline";
import { Delete } from "@styled-icons/material-outlined";

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
  padding: 8px;
  margin: 0 0 8px 0;
  height: 80px;
  background: white;
  color: grey;
  border-radius: 4px;
  display: flex;
`;

const CardContent = styled.div`
  flex: 1;
`;

const CardActions = styled.div`
  display: flex;
  flex-direction: column;
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
