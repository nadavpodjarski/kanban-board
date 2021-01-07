import { FC, useState } from "react";
import styled from "styled-components";

import { useDispatch } from "react-redux";
import { motion } from "framer-motion";

import * as utils from "../utils";
import * as DNDActions from "../redux/actions";

const AddCard: FC<{
  closeAddCard: () => void;
  boardId: string;
  columnId: string;
}> = ({ closeAddCard, boardId, columnId }) => {
  const [value, setValue] = useState("");

  const dispatch = useDispatch();

  const onChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setValue(value);
  };

  const onAddHandler = () => {
    if (!value.trim()) return;
    const newCard = utils.createCard(value);
    dispatch(DNDActions.onAddCard(boardId, columnId, newCard));
    setValue("");
  };

  const onCancelHandler = () => {
    closeAddCard();
  };

  return (
    <AddCardContainer
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
      }}
    >
      <TextArea value={value} onChange={onChangeHandler} />
      <ActionsWrapper>
        <AddButton onClick={onAddHandler}>Add</AddButton>
        <CancelButton onClick={onCancelHandler}>Cancel</CancelButton>
      </ActionsWrapper>
    </AddCardContainer>
  );
};

export default AddCard;

const AddCardContainer = styled(motion.div)`
  height: 140px;
  width: 100%;
  padding: 0 8px;
  margin-bottom: 8px;
  display: grid;
  grid-template-rows: 1fr auto;
  gap: 8px;
  box-sizing: border-box;
`;

const TextArea = styled.textarea.attrs((props) => ({
  placeholder: "Add Your Task",
  cols: 10,
}))`
  font-family: inherit;
  padding: 8px;
  resize: none;
  width: 100%;
  box-sizing: border-box;
  border-radius: 8px;
`;

const ActionsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  height: auto;
  height: 32px;
`;

const AddButton = styled.button`
  background: #0e84a2;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const CancelButton = styled.button`
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;
