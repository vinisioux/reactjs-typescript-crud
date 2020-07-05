import React from 'react';

import { render, wait, fireEvent } from '@testing-library/react';
import AxiosMock from 'axios-mock-adapter';
import api from '../../services/api';

import ListUsers from '../../pages/ListUsers';

const apiMock = new AxiosMock(api);

const mockedHistoryPush = jest.fn();

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
      user: {
        email: 'test@test.com',
      },
    }),
  };
});

describe('List Users', () => {
  it('should be able to list all users from api', async () => {
    apiMock.onGet('usuarios?_sort=id&_order=desc&_page=1&_limit=5').reply(200, [
      {
        data: {
          name: 'João Pedro',
          cpf: '894.651.324-55',
          email: 'joaopedro@gmail.com',
          zipcode: '02012030',
          address: 'Praça A Gazeta da Zona Norte',
          number: '65',
          neighborhood: 'Santana',
          city: 'São Paulo',
        },
        id: 1,
      },
      {
        data: {
          name: 'João Miguel',
          cpf: '841.513.515-42',
          email: 'joao@gmail.com',
          zipcode: '05541320',
          address: 'Rua Abraham Bloemaert',
          number: '594',
          neighborhood: 'Jardim das Vertentes',
          city: 'Rio de Janeiro',
        },
        id: 2,
      },
      {
        data: {
          name: 'Maria Luana',
          cpf: '894.513.216-51',
          email: 'maria@gmail.com',
          zipcode: '04131110',
          address: 'Rua Abraham Bosse',
          number: '3232',
          neighborhood: 'Vila Gumercindo',
          city: 'Belo Horizonte',
        },
        id: 3,
      },
      {
        data: {
          name: 'Enzo Gabriel',
          cpf: '641.891.981-98',
          email: 'enzo@gmail.com',
          zipcode: '04286100',
          address: 'Rua Abrahão Calux',
          number: '6546',
          neighborhood: 'Vila Moinho Velho',
          city: 'Curitiba',
        },
        id: 4,
      },
      {
        data: {
          name: 'Maria Eduarda',
          cpf: '198.189.111-20',
          email: 'maria.eduarda@gmail.com',
          zipcode: '05516060',
          address: 'Rua Abrahão Jorge Miguel',
          number: '11',
          neighborhood: 'Caxingui',
          city: 'Salvador',
        },
        id: 5,
      },
    ]);

    const { getByText } = render(<ListUsers />);

    await wait(() => expect(getByText('João Pedro')).toBeTruthy(), {
      timeout: 200,
    });
    expect(getByText('894.651.324-55')).toBeTruthy();
    expect(getByText('joaopedro@gmail.com')).toBeTruthy();
    expect(getByText('São Paulo')).toBeTruthy();

    expect(getByText('João Miguel')).toBeTruthy();
    expect(getByText('841.513.515-42')).toBeTruthy();
    expect(getByText('joao@gmail.com')).toBeTruthy();
    expect(getByText('Rio de Janeiro')).toBeTruthy();

    expect(getByText('Maria Luana')).toBeTruthy();
    expect(getByText('894.513.216-51')).toBeTruthy();
    expect(getByText('maria@gmail.com')).toBeTruthy();
    expect(getByText('Belo Horizonte')).toBeTruthy();

    expect(getByText('Maria Eduarda')).toBeTruthy();
    expect(getByText('641.891.981-98')).toBeTruthy();
    expect(getByText('enzo@gmail.com')).toBeTruthy();
    expect(getByText('Curitiba')).toBeTruthy();

    expect(getByText('Maria Luana')).toBeTruthy();
    expect(getByText('198.189.111-20')).toBeTruthy();
    expect(getByText('maria.eduarda@gmail.com')).toBeTruthy();
    expect(getByText('Salvador')).toBeTruthy();
  });

  it('should be able to list filtered users from api', async () => {
    const { getByText, getByPlaceholderText } = render(<ListUsers />);

    const searchField = getByPlaceholderText('Digite um nome para buscar...');

    fireEvent.change(searchField, { target: { value: 'joao' } });

    apiMock.onGet('usuarios?q=joao&_sort=id&_order=desc').reply(200, [
      {
        data: {
          name: 'João Lucas',
          cpf: '622.820.050-05',
          email: 'joaolucas@gmail.com',
          zipcode: '05852410',
          address: 'Rua Abram Chaim Pryzant',
          number: '979',
          neighborhood: 'Parque Santo Antônio',
          city: 'São Paulo',
        },
        id: 6,
      },
      {
        data: {
          name: 'Lucas João',
          cpf: '846.512.386-51',
          email: 'lucasjoao@gmail.com',
          zipcode: '91760581',
          address: 'Praça Adel Carvalho',
          number: '21',
          neighborhood: 'Jardim Isabel',
          city: 'Porto Alegre',
        },
        id: 18,
      },
      {
        data: {
          name: 'João Pedro',
          cpf: '894.651.324-55',
          email: 'joaopedro@gmail.com',
          zipcode: '02012030',
          address: 'Praça A Gazeta da Zona Norte',
          number: '65',
          neighborhood: 'Santana',
          city: 'Rio de Janeiro',
        },
        id: 1,
      },
    ]);

    await wait(() => expect(getByText('João Lucas')).toBeTruthy(), {
      timeout: 3000,
    });
    expect(getByText('846.512.386-51')).toBeTruthy();
    expect(getByText('joaolucas@gmail.com')).toBeTruthy();
    expect(getByText('São Paulo')).toBeTruthy();

    expect(getByText('Lucas João')).toBeTruthy();
    expect(getByText('846.512.386-51')).toBeTruthy();
    expect(getByText('lucasjoao@gmail.com')).toBeTruthy();
    expect(getByText('Porto Alegre')).toBeTruthy();

    expect(getByText('João Pedro')).toBeTruthy();
    expect(getByText('894.651.324-55')).toBeTruthy();
    expect(getByText('joaopedro@gmail.com')).toBeTruthy();
    expect(getByText('Rio de Janeiro')).toBeTruthy();
  });
});
