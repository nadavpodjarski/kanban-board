import styled from "styled-components";

import { useState, FC } from "react";

import { useDispatch } from "react-redux";

import { onEditColumn } from "../redux/actions";

import { CloseOutline } from "@styled-icons/evaicons-outline/";

const EditColumnModal: FC<{
  boardId: string;
  columnId: string;
  value: string;
  closeModal: () => void;
}> = ({ boardId, columnId, value, closeModal }) => {
  const [name, setName] = useState(value);

  const dispatch = useDispatch();

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) =>
    setName(e.target.value);

  const onSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    dispatch(onEditColumn(boardId, columnId, name));
    setName("");
    closeModal();
  };

  return (
    <EditColumnModalContainer onClick={(e) => e.stopPropagation()}>
      <Header>
        <Title>Rename Column</Title>
        <CloseButton onClick={closeModal} />
      </Header>
      <EditColumnForm onSubmit={onSubmitHandler}>
        <Input
          placeholder="Rename Column"
          value={name}
          onChange={onChangeHandler}
        />
        <ActionsWrapper>
          <ConfirmButton type="submit">Edit</ConfirmButton>
          <CancelButton onClick={closeModal}>Cancel</CancelButton>
        </ActionsWrapper>
      </EditColumnForm>
    </EditColumnModalContainer>
  );
};

export default EditColumnModal;

const Header = styled.div`
  color: black;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  padding: 16px;
`;

const Title = styled.span``;

const CloseButton = styled(CloseOutline)`
  color: rgba(0, 0, 0, 0.5);
  width: 18px;
  cursor: pointer;
  &:hover {
    color: black;
  }
`;

const Input = styled.input`
  width: 100%;
  box-sizing: border-box;
  margin-top: 24px;
`;

const EditColumnForm = styled.form`
  padding: 0 16px;
  flex: 1;
`;

const EditColumnModalContainer = styled.div`
  background: white;
  height: auto;
  width: 300px;
  box-sizing: border-box;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
`;

const ActionsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6px;
  margin: 24px 0;
  height: 32px;
`;

const ConfirmButton = styled.button`
  background: #0e84a2;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const CancelButton = styled.button`
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background: rgba(0, 0, 0, 0.2);
  color: rgba(0, 0, 0, 0.7);
`;
