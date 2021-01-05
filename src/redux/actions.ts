import * as types from "./types";

import { DropResult } from "react-beautiful-dnd";

export const onDragEnd = (result: DropResult) => {
  return {
    type: types.DRAG_END,
    payload: result,
  };
};

export const onAddCard = () => {};

export const onDeleteCard = () => {};

export const onAddColumn = () => {};

export const onDeleteColumn = () => {};
