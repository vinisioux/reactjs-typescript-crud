import React, { useState, useContext, FormEvent } from 'react';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';

import { AuthContext } from '../../context/auth';

import logo from '../../assets/logo.png';

import { Container } from './styles';

const Home: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const history = useHistory();

  const { signIn } = useContext(AuthContext);

  const handleSubmit = async (event: FormEvent) => {
    event?.preventDefault();

    const schema = Yup.object().shape({
      email: Yup.string().email().required('E-mail é obrigatório'),
      password: Yup.string()
        .min(5, 'Mínimo 5 caracteres')
        .required('Senha é obrigatória'),
    });
    const data = { email, password };

    const valid = await schema.isValid(data);

    if (!valid) {
      toast.error('Existem campo(s) inválidos, verificar novamente...');
      return;
    }

    signIn({
      email,
      password,
    });

    history.push('/users');
  };

  return (
    <Container>
      <form data-testid="login-form" onSubmit={handleSubmit}>
        <img src={logo} alt="Logo" />
        <input
          type="text"
          placeholder="Digite seu e-mail"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <input
          type="password"
          placeholder="Digite sua senha"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <button type="submit">Entrar</button>
      </form>
    </Container>
  );
};

export default Home;
