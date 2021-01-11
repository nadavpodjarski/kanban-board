import { v4 as uuid } from "uuid";
import { ColumnType } from "../components/Column";
import { CardType } from "../components/Card";

import * as types from "./types";

const items: CardType[] = [];

type Columns = Map<string, ColumnType>;

const salesColumns: Columns = new Map().set(uuid(), { name: "To do", items });
// .set(uuid(), { name: "In Progress", items })
// .set(uuid(), { name: "Done", items });

const rndColumns: Columns = new Map()
  .set(uuid(), { name: "To do", items })
  .set(uuid(), { name: "In Progress", items })
  .set(uuid(), { name: "Done", items });

type Boards = Map<string, { name: string; columns: Columns }>;
const boards: Boards = new Map().set(uuid(), {
  name: "Sales",
  columns: salesColumns,
});
// .set(uuid(), { name: "R&D", columns: rndColumns });

export interface IAPPState {
  boards: Boards;
}

const initialState: IAPPState = {
  boards,
};

export const appReducer = (
  state = initialState,
  action: { type: string; payload: any }
) => {
  switch (action.type) {
    case types.DRAG_END: {
      const { source, destination, type } = action.payload.result;
      const { boardId } = action.payload;
      const board = state.boards.get(boardId);
      let columns = board?.columns as NonNullable<Columns>;

      if (type === "DROPPABLE_COLUMN") {
        if (source.droppableId !== destination.droppableId) {
          const sourceColumn = columns.get(
            source.droppableId
          ) as NonNullable<ColumnType>;

          const destColumn = columns.get(
            destination.droppableId
          ) as NonNullable<ColumnType>;

          const sourceItems = [...sourceColumn.items];
          const destItems = [...destColumn.items];
          const [removed] = sourceItems?.splice(source.index, 1);

          destItems.splice(destination.index, 0, removed);

          columns.set(source.droppableId, {
            ...sourceColumn,
            items: sourceItems,
          });
          columns.set(destination.droppableId, {
            ...destColumn,
            items: destItems,
          });
        } else {
          const column = columns.get(
            source.droppableId
          ) as NonNullable<ColumnType>;
          const copiedItems = [...column.items];
          const [moved] = copiedItems.splice(source.index, 1);
          copiedItems.splice(destination.index, 0, moved);
          columns.set(source.droppableId, {
            ...column,
            items: copiedItems,
          });
        }
      }
      if (type === "DROPPABLE_BOARD" && board) {
        const columnsEntries = [...columns.entries()] as [string, ColumnType][];
        const [moved] = columnsEntries.splice(source.index, 1);
        columnsEntries.splice(destination.index, 0, moved);

        const newColumnsMap: Columns = new Map(columnsEntries);
        boards.set(boardId, { ...board, columns: newColumnsMap });
      }
      return { ...state };
    }
    case types.ADD_CARD: {
      const { boardId, columnId, newCard } = action.payload;
      const board = state.boards.get(boardId);
      const columns = board!.columns;

      const column = columns.get(columnId);

      if (column) {
        let cards = column.items;
        const newCards = [newCard, ...cards];
        columns.set(columnId, {
          ...column,
          items: newCards,
        });
      }
      return { ...state };
    }
    case types.DELETE_CARD: {
      const { boardId, columnId, cardId } = action.payload;
      const board = state.boards.get(boardId);
      const columns = board!.columns;

      const cards = columns!.get(columnId)!.items;
      columns.get(columnId)!.items = [
        ...cards.filter((card) => card.id !== cardId),
      ];

      return { ...state };
    }
    case types.EDIT_CARD: {
      const { boardId, columnId, updatedCard } = action.payload;
      const board = state.boards.get(boardId);
      const columns = board?.columns;

      const item = columns
        ?.get(columnId)!
        .items.find((item) => item.id === updatedCard.id);
      Object.assign(item, updatedCard);

      return { ...state };
    }
    case types.ADD_COLUMN: {
      const { boardId, newColumn } = action.payload;
      const board = state.boards.get(boardId);
      const columns = board?.columns;
      columns?.set(uuid(), newColumn);

      return { ...state };
    }
    case types.DELETE_COLUMN: {
      const { boardId, columnId } = action.payload;
      const board = state.boards.get(boardId);
      const columns = board?.columns;
      columns?.delete(columnId);
      return { ...state };
    }
    case types.EDIT_COLUMN: {
      const { boardId, columnId, name } = action.payload;
      state.boards.get(boardId)!.columns.get(columnId)!.name = name;
      return { ...state };
    }
    default:
      return state;
  }
};

export interface IUIState {
  isModalOpen: boolean;
  modal: any;
}

const uiInitialState: IUIState = {
  isModalOpen: true,
  modal: {},
};

export const uiReducer = (
  state = uiInitialState,
  action: { type: string; payload: any }
): IUIState => {
  switch (action.type) {
    case types.OPEN_MODAL:
      return {
        ...state,
        isModalOpen: true,
        modal: action.payload,
      };
    case types.CLOSE_MODAL:
      return {
        ...state,
        isModalOpen: false,
        modal: {},
      };
    default:
      return state;
  }
};
