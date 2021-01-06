import * as types from "./types";

import { DropResult } from "react-beautiful-dnd";
import { CardType } from "../components/Card";

export const onDragEnd = (result: DropResult, boardId: string) => {
  return {
    type: types.DRAG_END,
    payload: {
      result,
      boardId,
    },
  };
};

export const onAddCard = (
  boardId: string,
  columnId: string,
  newCard: CardType
) => {
  return {
    type: types.ADD_CARD,
    payload: {
      boardId,
      columnId,
      newCard,
    },
  };
};

export const onDeleteCard = (
  boardId: string,
  columnId: string,
  cardId: string
) => {
  return {
    type: types.DLETE_CARD,
    payload: {
      boardId,
      columnId,
      cardId,
    },
  };
};

export const onAddColumn = () => {};

export const onDeleteColumn = () => {};
