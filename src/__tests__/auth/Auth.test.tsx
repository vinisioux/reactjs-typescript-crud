import React, { useContext } from 'react';
import { render, fireEvent } from '@testing-library/react';
import { AuthContext, AuthProvider } from '../../context/auth';

const TestComponentLogin: React.FC = () => {
  const { signIn } = useContext(AuthContext);

  function handleSubmit(): void {
    signIn({
      email: 'test@test.com',
      password: '12345',
    });
    window.location.reload;
  }

  return (
    <>
      <form data-testid="login-form" onSubmit={handleSubmit}>
        <input type="text" placeholder="Digite seu e-mail" />
        <input type="password" placeholder="Digite sua senha" />
        <button type="submit">Entrar</button>
      </form>
    </>
  );
};

const TestComponentLogout: React.FC = () => {
  const { signOut } = useContext(AuthContext);

  return (
    <>
      <button type="button" onClick={signOut}>
        Sair
      </button>
    </>
  );
};

describe('Login Context', () => {
  it('should be able to login', async () => {
    const { getByTestId } = render(
      <AuthProvider>
        <TestComponentLogin />
      </AuthProvider>,
    );

    fireEvent.submit(getByTestId('login-form'));

    expect(localStorage.getItem('@2sow:email')).toEqual('test@test.com');
    expect(localStorage.getItem('@2sow:token')).toBeDefined();
  });

  it('should be able to logout', async () => {
    localStorage.setItem('@2sow:token', '8949as81d98as1d98asd9as');
    localStorage.setItem('@2sow:email', 'test@test.com');
    const { getByText } = render(
      <AuthProvider>
        <TestComponentLogout />
      </AuthProvider>,
    );

    fireEvent.click(getByText('Sair'));

    expect(localStorage.getItem('@2sow:email')).toEqual(null);
    expect(localStorage.getItem('@2sow:token')).toEqual(null);
  });
});
