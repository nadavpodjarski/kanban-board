import styled from "styled-components";

import { Add } from "@styled-icons/ionicons-solid";

import { useDispatch } from "react-redux";
import { openModal } from "../redux/actions";

import { FC } from "react";

import { motion } from "framer-motion";

const variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 1,
    },
  },
};

const AddColumn: FC<{ boardId: string }> = ({ boardId }) => {
  const dispatch = useDispatch();

  const openAddColumnModal = () =>
    dispatch(openModal("add-column", { boardId }));

  return (
    <AddColumnContainer variants={variants} initial="hidden" animate="visible">
      <PlaceHolder />
      <AddColumnInnerContainer
        data-cy="add-column-container"
        onClick={openAddColumnModal}
      >
        <Title data-cy="add-column-text">Add Column</Title>
        <AddIcon />
      </AddColumnInnerContainer>
    </AddColumnContainer>
  );
};

export default AddColumn;

const AddColumnContainer = styled(motion.div)`
  min-width: 350px;
  padding: 8px 8px 8px 2px;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  align-items: flex-end;
  display: flex;
  flex-direction: column;
`;

const AddIcon = styled(Add)`
  width: 24px;
`;

const Title = styled.span`
  font-size: 18px;
`;

const PlaceHolder = styled.div`
  height: 40px;
  margin: 24px 0;
  width: 100%;
`;

const AddColumnInnerContainer = styled.div`
  border: 1px dashed rgba(0, 0, 0, 0.6);
  flex: 1;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;
