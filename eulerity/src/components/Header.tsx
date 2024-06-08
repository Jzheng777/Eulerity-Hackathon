import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../pic/pet-icon.jpeg';

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: #373737;
  color: #ffffff;
  font-weight: 600;
  margin-bottom: 40px;
`;

const Logo = styled.div`
  img {
    width: 55px;
    height: 55px;
    border-radius: 20%;
    background-size: cover;
  }
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  flex-grow: 1;
  justify-content: center;
`;

const NavLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  margin: 0 20px;
  font-size: 25px;
  @media screen and (max-width: 610px) {
    font-size: 17px;
  }

  &:hover {
    color: #ffcc00;
  }
`;

const Header: React.FC = () => {
  return (
    <HeaderContainer>
      <Logo>
        <Link to="/"><img src={logo} alt="Logo" /></Link>
      </Logo>
      <Nav>
        <NavLink to="/" className="nav-link">Home</NavLink>
        <NavLink to="/about" className="nav-link">About Me</NavLink>
      </Nav>
    </HeaderContainer>
  );
};

export default Header;
