import { motion } from "framer-motion";

import styled from "styled-components";

import React, { FC, useState } from "react";

import { CloseOutline } from "@styled-icons/evaicons-outline/";

import { CardType } from "./Card";

import { useDispatch } from "react-redux";
import { onEditCard } from "../redux/actions";

const EditCard: FC<{
  boardId: string;
  columnId: string;
  item: CardType;
  closeModal: () => void;
}> = ({ boardId, columnId, item, closeModal }) => {
  const [value, setValue] = useState(item.content);
  const dispatch = useDispatch();

  const closeModalHandler = () => {
    closeModal();
  };

  const onChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setValue(value);
  };

  const onConfirmHandler = () => {
    if (!value.trim()) return;
    item.content = value;
    item.updatedAt = Date.now();
    dispatch(onEditCard(boardId, columnId, item));
    closeModalHandler();
  };

  return (
    <EditCardContainer
      onClick={(e) => e.stopPropagation()}
      initial={{ scale: 0 }}
      animate={{ rotate: 360, scale: 1 }}
      exit={{ scale: 0, rotate: 0 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
      }}
    >
      <Header>
        <Title>Edit Card</Title>
        <CloseButton onClick={closeModalHandler} />
      </Header>
      <EditCardBody>
        <TextArea value={value} onChange={onChangeHandler} />
        <ActionsWrapper>
          <ConfirmEditButton onClick={onConfirmHandler}>Edit</ConfirmEditButton>
          <CancelEditButton onClick={closeModalHandler}>
            Cancel
          </CancelEditButton>
        </ActionsWrapper>
      </EditCardBody>
    </EditCardContainer>
  );
};

export default EditCard;

const EditCardContainer = styled(motion.div)`
  height: 300px;
  width: 400px;
  border-radius: 15px;
  background: white;
  color: black;
  display: flex;
  flex-direction: column;
`;

const CloseButton = styled(CloseOutline)`
  width: 18px;
  height: 18px;
  color: rgba(0, 0, 0, 0.7);
  &:hover {
    color: black;
  }
  cursor: pointer;
`;

const Title = styled.span`
  font-size: 18px;
`;

const Header = styled.div`
  width: 100%;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
`;

const EditCardBody = styled.div`
  padding: 16px;
  flex: 1;
`;

const TextArea = styled.textarea`
  resize: none;
  width: 100%;
  font-family: inherit;
  height: 150px;
  padding: 8px;
  box-sizing: border-box;
`;

const ActionsWrapper = styled.div`
  padding: 16px 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6px;
  height: 36px;
`;

const ConfirmEditButton = styled.button`
  background: #0e84a2;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const CancelEditButton = styled.button`
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background: rgba(0, 0, 0, 0.2);
  color: rgba(0, 0, 0, 0.7);
`;
