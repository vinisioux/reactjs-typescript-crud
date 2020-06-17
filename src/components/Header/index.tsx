import React, { useContext } from 'react';
import { FiLogOut } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import { AuthContext } from '../../context/auth';

import { Container, HeaderContent, Menu, Profile } from './styles';

import logo from '../../assets/logo.png';

const Header: React.FC = () => {
  const { user, signOut } = useContext(AuthContext);

  return (
    <Container>
      <HeaderContent>
        <div>
          <img src={logo} alt="SpaceY" />
          <Profile>
            <span>Bem vindo!</span>
            <strong>{user.email}</strong>
          </Profile>
        </div>

        <Menu>
          <Link to="/users">Listagem</Link>
          <Link to="/register-user">Adicionar um usuário</Link>
        </Menu>

        <button type="button" onClick={signOut}>
          <FiLogOut /> Sair
        </button>
      </HeaderContent>
    </Container>
  );
};

export default Header;
