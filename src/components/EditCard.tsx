import { motion, AnimateLayoutFeature } from "framer-motion";

import styled from "styled-components";

import { FC } from "react";

import { CardType } from "./Card";

const EditCard: FC<{
  boardId: string;
  columnId: string;
  item: CardType;
}> = ({ boardId, columnId, item }) => {
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
      {item.content}
    </EditCardContainer>
  );
};

export default EditCard;

const EditCardContainer = styled(motion.div)`
  height: 400px;
  width: 400px;
  border-radius: 15px;
  background: white;
  color: black;
`;
