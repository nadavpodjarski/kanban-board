import * as types from "./types";

import { DropResult, ResponderProvided } from "react-beautiful-dnd";

export const onDragEnd = (result: DropResult, provided: ResponderProvided) => {
  return {
    type: types.DRAG_END,
    payload: result,
  };
};

export const onAddCard = () => {};
