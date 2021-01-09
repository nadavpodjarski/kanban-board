import { Droppable, Draggable } from "react-beautiful-dnd";
import { FC, useState } from "react";

import styled from "styled-components";
import Card from "./Card";
import AddCard from "./AddCard";
import ClickOutsideOverlay from "./ClickOutsideOverlay";

import { useDispatch } from "react-redux";
import { onDeleteColumn, openModal } from "../redux/actions";

import { Add } from "@styled-icons/ionicons-solid";
import { ThreeDots } from "@styled-icons/bootstrap";

import { AnimatePresence, motion } from "framer-motion";

import { CardType } from "./Card";

export type ColumnType = {
  name: string;
  items: CardType[];
};

interface IColumn {
  id: string;
  column: ColumnType;
  boardId: string;
  index: number;
}

const menu = {
  open: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    opacity: 0,
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

const menuItem = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
};

const Column: FC<IColumn> = ({ id: columnId, column, boardId, index }) => {
  const [isAddCard, setIsAddCard] = useState(false);
  const [isShowMenu, setIsShowMenu] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const dispatch = useDispatch();

  const toggleAddCard = () => {
    setIsAddCard((prevState) => !prevState);
  };

  const closeMenu = () => {
    setIsShowMenu(false);
  };

  const toggleMenu = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    setIsShowMenu((prevState) => !prevState);
  };

  const onDeleteHandler = () => {
    dispatch(onDeleteColumn(boardId, columnId));
  };

  const openEditModal = () => {
    dispatch(
      openModal("edit-column", { boardId, columnId, value: column.name })
    );
  };

  return (
    <Draggable draggableId={columnId} index={index}>
      {(provided, snapshot) => {
        setIsDragging(snapshot.isDragging);
        return (
          <ColumnContainer
            {...provided.draggableProps}
            ref={provided.innerRef}
            style={{
              ...provided.draggableProps.style,
            }}
          >
            <ColumnHeader>
              <ColumnTitleWrapper>
                <ColumnTitle {...provided.dragHandleProps}>
                  {column.name}
                </ColumnTitle>
              </ColumnTitleWrapper>
              <AddIcon onClick={toggleAddCard} />
              <MenuIconWrapper>
                <MenuIcon onClick={toggleMenu} />
              </MenuIconWrapper>
              <AnimatePresence exitBeforeEnter>
                {isShowMenu && (
                  <>
                    <ClickOutsideOverlay onClickOutside={closeMenu} />
                    <Menu
                      variants={menu}
                      initial="closed"
                      animate="open"
                      exit="closed"
                    >
                      <MenuItem variants={menuItem} onClick={openEditModal}>
                        Edit
                      </MenuItem>
                      <MenuItem variants={menuItem} onClick={onDeleteHandler}>
                        Delete
                      </MenuItem>
                    </Menu>
                  </>
                )}
              </AnimatePresence>
            </ColumnHeader>
            <AnimatePresence exitBeforeEnter>
              {isAddCard && (
                <AddCard
                  closeAddCard={toggleAddCard}
                  columnId={columnId}
                  boardId={boardId}
                />
              )}
            </AnimatePresence>
            <Droppable droppableId={columnId} type="DROPPABLE_COLUMN">
              {(provided, snapshot) => {
                return (
                  <DroppableColumn
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    style={{
                      background: snapshot.isDraggingOver
                        ? "rgba(0,0,0,0.3)"
                        : "rgba(0,0,0,0.1)",
                      boxShadow: isDragging
                        ? "0 0 12px 6px rgba(255,255,255,0.5)"
                        : "none",
                    }}
                  >
                    {column.items?.map((item, index) => {
                      return (
                        <Card
                          item={item}
                          index={index}
                          key={item.id}
                          columnId={columnId}
                          boardId={boardId}
                        />
                      );
                    })}
                  </DroppableColumn>
                );
              }}
            </Droppable>
          </ColumnContainer>
        );
      }}
    </Draggable>
  );
};

export default Column;

const ColumnContainer = styled.div`
  min-width: 350px;
  width: 350px;
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 8px 8px 8px 0;
  box-sizing: border-box;
`;

const MenuIconWrapper = styled.div``;

const Menu = styled(motion.ul)`
  position: absolute;
  right: 0;
  top: 100%;
  list-style: none;
  background: white;
  color: black;
  border-radius: 4px;
  justify-content: flex-start;
  padding: 8px 0;
  width: 120px;
  text-align: left;
  margin: 0;
  box-shadow: 0 0 15px 6px rgba(0, 0, 0, 0.15);
  z-index: 2;
`;

const MenuItem = styled(motion.li)`
  width: 100%;
  border-top: 1px solid rgba(0, 0, 0, 0.2);
  padding: 4px 8px;
  box-sizing: border-box;
  cursor: pointer;
  &:hover {
    background: rgba(0, 0, 0, 0.1);
  }
  &:last-child {
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  }
`;

const ColumnHeader = styled.div`
  text-align: center;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 24px 0;
  height: 40px;
  position: relative;
`;

const ColumnTitleWrapper = styled.span`
  flex: 1;
  display: flex;
  justify-content: center;
`;

const ColumnTitle = styled.span`
  font-size: 24px;
  font-weight: bold;
`;

const DroppableColumn = styled.div`
  width: 100%;
  flex: 1;
  padding: 8px;
  box-sizing: border-box;
  overflow-y: auto;
  transition: all 200ms linear;
  scrollbar-width: none;
`;
const AddIcon = styled(Add)`
  color: rgba(0, 0, 0, 0.8);
  width: 20px;
  cursor: pointer;
  &:hover {
    color: white;
  }
`;

const MenuIcon = styled(ThreeDots)`
  width: 18px;
  color: rgba(0, 0, 0, 0.8);
  margin-left: 8px;
  cursor: pointer;
`;
