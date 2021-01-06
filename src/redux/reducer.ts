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
  { id: uuid(), content: "First task" },
  { id: uuid(), content: "Second task" },
  { id: uuid(), content: "Third task" },
  { id: uuid(), content: "Fourth task" },
  { id: uuid(), content: "Fifth task" },
];

const columnSales: { [id: string]: ColumnType } = {
  [uuid()]: {
    name: "To do",
    items: items,
  },
  [uuid()]: {
    name: "In Progress",
    items: [],
  },
};
const columnsRD: { [id: string]: ColumnType } = {
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
  boards: {
    [id: string]: {
      name: string;
      columns?: { [id: string]: ColumnType };
    };
  };
}

const initialState: IDNDReducer = {
  boards: {
    [uuid()]: {
      name: "Sales",
      columns: columnSales,
    },
    [uuid()]: {
      name: "R&D",
      columns: columnsRD,
    },
    [uuid()]: {
      name: "Test",
      columns: {},
    },
  },
};

export const dndReducer = (
  state = initialState,
  action: { type: string; payload: any }
) => {
  switch (action.type) {
    case types.DRAG_END: {
      const { source, destination } = action.payload.result;
      const { boardId } = action.payload;
      const board = state.boards[boardId];
      let columns = board.columns;
      if (columns) {
        if (source.droppableId !== destination.droppableId) {
          // Different Columns
          const sourceColumn = _.cloneDeep(columns[source.droppableId]);
          const destColumn = _.cloneDeep(columns[destination.droppableId]);
          const sourceItems = _.cloneDeep(sourceColumn.items);
          const destItems = _.cloneDeep(destColumn.items);
          const [removed] = sourceItems.splice(source.index, 1);
          destItems.splice(destination.index, 0, removed);

          columns[source.droppableId] = {
            ...sourceColumn,
            items: sourceItems,
          };
          columns[destination.droppableId] = {
            ...destColumn,
            items: destItems,
          };
        } else {
          // Same Columns
          const column = columns[source.droppableId];
          const copiedItems = _.cloneDeep(column.items);
          const [moved] = copiedItems.splice(source.index, 1);
          copiedItems.splice(destination.index, 0, moved);
          columns[source.droppableId] = {
            ...column,
            items: copiedItems,
          };
        }
      }

      return { ...state };
    }
    case types.ADD_CARD: {
      const { boardId, columnId, newCard } = action.payload;
      const board = state.boards[boardId];
      const columns = board.columns;

      if (columns) {
        const cards = columns[columnId].items;
        columns[columnId].items = [newCard, ...cards];
      }

      return { ...state };
    }
    case types.DLETE_CARD: {
      const { boardId, columnId, cardId } = action.payload;
      const board = state.boards[boardId];
      const columns = board.columns;

      if (columns) {
        const cards = columns[columnId].items;
        columns[columnId].items = [
          ...cards.filter((card) => card.id !== cardId),
        ];
      }
      return { ...state };
    }

    default:
      return state;
  }
};
