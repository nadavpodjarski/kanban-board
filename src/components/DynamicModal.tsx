import styled from "styled-components";
import { FC } from "react";

import { useSelector, useDispatch } from "react-redux";
import { closeModal } from "../redux/actions";

import { motion, AnimatePresence } from "framer-motion";

import EditCardModal from "./EditCardModal";
import AddColumnModal from "./AddColumnModal";

const matchModal = (type: string) => {
  switch (type) {
    case "edit-card":
      return EditCardModal;
    case "add-column":
      return AddColumnModal;
    default:
      return null;
  }
};

const DynamicModal: FC = () => {
  const { isModalOpen, modal } = useSelector((state) => state.ui);

  const dispacth = useDispatch();

  const Modal = matchModal(modal?.type);

  const closeModalHandler = () => {
    dispacth(closeModal());
  };

  return (
    <AnimatePresence exitBeforeEnter>
      {isModalOpen && Modal ? (
        <Overlay
          onClick={closeModalHandler}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ opacity: 0 }}
        >
          <Modal {...modal?.props} closeModal={closeModalHandler} />
        </Overlay>
      ) : null}
    </AnimatePresence>
  );
};

export default DynamicModal;

const Overlay = styled(motion.div)`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.4);
  padding: 0 16px;
  box-sizing: border-box;
`;
