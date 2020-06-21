import React from 'react';
import styled from 'styled-components';

const UserCardWrapper = styled.div`
  height: 50px;
  max-width: 200px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const SPAN = styled.span`
  font-weight: 200;
  font-size: 16px;
  margin-right: 10px;
`

const Avatar = styled.img`
  height: 50px;
  width: 50px;
  border-radius: 50%;
  background: gray;
`

const UserCard = ({firstName, lastName, avatar}) => (
  <UserCardWrapper>
    <SPAN>{firstName} {lastName}</SPAN>
    <Avatar />
  </UserCardWrapper>
);

export default UserCard;