import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';
import Login from '../../pages/Login';

const mockedHistoryPush = jest.fn();
const mockedLogin = jest.fn();

jest.mock('react-router-dom', () => {
  return {
    useHistory: () => ({
      push: mockedHistoryPush,
    }),
    Link: ({ children }: { children: React.ReactNode }) => children,
  };
});

jest.mock('../../hooks/auth', () => {
  return {
    useAuth: () => ({
      signIn: mockedLogin,
    }),
  };
});

describe('Login Page', () => {
  beforeEach(() => {
    mockedHistoryPush.mockClear();
  });

  it('should be able to login', async () => {
    const { getByPlaceholderText, getByText } = render(<Login />);

    const emailField = getByPlaceholderText('Digite seu e-mail');
    const passwordField = getByPlaceholderText('Digite sua senha');
    const buttonElement = getByText('Entrar');

    fireEvent.change(emailField, { target: { value: 'test@test.com' } });
    fireEvent.change(passwordField, { target: { value: '123456' } });

    fireEvent.click(buttonElement);

    await wait(() => {
      expect(mockedHistoryPush).toHaveBeenCalledWith('/users');
    });
  });
});
