import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();

  const handleRoomRedirect = () => {
    navigate('/room');
  };

  return (
    <NavBarStyled>
      <h1>Ritesh</h1>
      <button onClick={handleRoomRedirect}>+Room</button>
    </NavBarStyled>
  );
}

const NavBarStyled = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: #333;
  color: white;
  border-bottom: 1px solid white;

  button {
    width: 5vw;
    height: 5vh;
    border-radius: 0.5rem;
    background-color: green;
  }

  h1 {
    color: white;
  }
`;

export default Navbar;
