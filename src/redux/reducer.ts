import { type } from "os";
import { v4 as uuid } from "uuid";
import { IColumn } from "../components/Column";
import * as types from "./types";

const items = [
  { id: uuid(), content: "First task" },
  { id: uuid(), content: "Second task" },
  { id: uuid(), content: "Third task" },
  { id: uuid(), content: "Fourth task" },
  { id: uuid(), content: "Fifth task" },
];

const columns: { [id: string]: IColumn } = {
  [uuid()]: {
    name: "To do",
    items: items,
  },
  [uuid()]: {
    name: "In Progress",
    items: [],
  },
};

export interface IDNDReducer {
  columns: { [id: string]: IColumn };
}

const initialState: IDNDReducer = {
  columns,
};

export const dndReducer = (
  state = initialState,
  action: { type: string; payload: any }
) => {
  switch (action.type) {
    case types.DRAG_END:
      console.log(action.payload);
      return state;
    default:
      return state;
  }
};
