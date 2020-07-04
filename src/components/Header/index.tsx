import React from 'react';
import { FiLogOut } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import { useAuth } from '../../hooks/auth';

import { Container, HeaderContent, Menu, Profile } from './styles';

import logo from '../../assets/logo.png';

const Header: React.FC = () => {
  const { user, signOut } = useAuth();

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
          <Link to="/form-user/add">Adicionar um usuário</Link>
        </Menu>

        <button type="button" onClick={signOut}>
          <FiLogOut /> Sair
        </button>
      </HeaderContent>
    </Container>
  );
};

export default Header;
