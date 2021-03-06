import { v4 as uuid } from "uuid";

import { CardType } from "../components/Card";

export const createCard = (content: any): CardType => {
  return {
    id: uuid(),
    content,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };
};

export const createColumn = (name: string) => {
  return {
    name,
    items: [],
  };
};

export const createBoard = () => {};
