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
    type: types.DELETE_CARD,
    payload: {
      boardId,
      columnId,
      cardId,
    },
  };
};

export const onEditCard = (
  boardId: string,
  columnId: string,
  updatedCard: CardType
) => {
  return {
    type: types.EDIT_CARD,
    payload: {
      boardId,
      columnId,
      updatedCard,
    },
  };
};

export const onAddColumn = (boardId: string, newColumn: any) => {
  return {
    type: types.ADD_COLUMN,
    payload: {
      boardId,
      newColumn,
    },
  };
};

export const onDeleteColumn = () => {};

export const openModal = (type: string, props?: {}) => {
  return {
    type: types.OPEN_MODAL,
    payload: {
      type,
      props,
    },
  };
};

export const closeModal = () => {
  return {
    type: types.CLOSE_MODAL,
  };
};
