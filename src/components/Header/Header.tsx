import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { db } from '../../firebase';

interface HeaderProps {
  setState: React.Dispatch<React.SetStateAction<string>>;
  total: number;
  done: number;
}

const Header = ({ setState, total, done }: HeaderProps) => {
  const handleOptions = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setState(e.target.value);
  };

  const handleClick = async () => {
    const querySnapshot = await getDocs(collection(db, 'tasks'));
    querySnapshot.forEach(async (doc) => {
      await deleteDoc(doc.ref);
    });
  };

  return (
    <Container>
      <Title>Hotel Contents</Title>
      <Tracking>
        <FlexContainer>
          <div>
            <span>인입 건수 :</span>
            <span>{total}</span>
          </div>
          <div>
            <span>처리 완료 :</span>
            <span>{done}</span>
          </div>
        </FlexContainer>
        <DeleteButton onClick={handleClick}>delete</DeleteButton>

        <Select>
          <select name='options' id='options' onChange={handleOptions}>
            <option value='선택' disabled selected>
              선택
            </option>
            <option value='모두'>모두</option>
            <option value='질의중'>질의중</option>
            <option value='미처리'>미처리</option>
            <option value='처리중'>처리중</option>
            <option value='처리완료'>처리완료</option>
          </select>
        </Select>
      </Tracking>
    </Container>
  );
};

export default Header;

const Container = styled.div`
  margin-bottom: 20px;
`;

const FlexContainer = styled.div`
  display: flex;
  align-items: bottom;
  gap: 20px;
`;

const DeleteButton = styled.button`
  width: 80px;
  height: 30px;
  color: #fff;
  background-color: #ee3030;
  border: none;
  border-radius: 20px;
  cursor: pointer;
`;

const Tracking = styled.div`
  display: flex;
  gap: 20px;
  padding-left: 20px;
  span {
    margin-right: 5px;
  }
`;

const Title = styled.h1`
  margin: 20px;
  font-size: 2rem;
  font-weight: 600;
  font-family: 'font_bold';
`;

const Select = styled.div`
  margin-left: auto;
`;
