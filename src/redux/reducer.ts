import { v4 as uuid } from "uuid";
import { ColumnType } from "../components/Column";

import * as types from "./types";
import * as _ from "lodash";

const items = [
  { id: uuid(), content: "First task" },
  { id: uuid(), content: "Second task" },
  { id: uuid(), content: "Third task" },
  { id: uuid(), content: "Fourth task" },
  { id: uuid(), content: "Fifth task" },
];

const columns: { [id: string]: ColumnType } = {
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
  columns: { [id: string]: ColumnType };
}

const initialState: IDNDReducer = {
  columns,
};

export const dndReducer = (
  state = initialState,
  action: { type: string; payload: any }
) => {
  switch (action.type) {
    case types.DRAG_END: {
      const { source, destination } = action.payload;
      if (source.droppableId !== destination.droppableId) {
        // Different Columns
        const sourceColumn = state.columns[source.droppableId];
        const destColumn = state.columns[destination.droppableId];
        const sourceItems = _.cloneDeep(sourceColumn.items);
        const destItems = _.cloneDeep(destColumn.items);
        const [removed] = sourceItems.splice(source.index, 1);
        destItems.splice(destination.index, 0, removed);
        state.columns = {
          ...state.columns,
          [source.droppableId]: {
            ...sourceColumn,
            items: sourceItems,
          },
          [destination.droppableId]: {
            ...destColumn,
            items: destItems,
          },
        };
      } else {
        // Same Columns
        const column = state.columns[source.droppableId];
        const copiedItems = _.cloneDeep(column.items);
        const [moved] = copiedItems.splice(source.index, 1);
        copiedItems.splice(destination.index, 0, moved);
        state.columns = {
          ...state.columns,
          [source.droppableId]: {
            ...column,
            items: copiedItems,
          },
        };
      }
      return { ...state };
    }
    default:
      return state;
  }
};
