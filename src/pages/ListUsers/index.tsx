import React, { useCallback, useEffect, useState } from 'react';
import { FiEdit, FiTrash2, FiSearch } from 'react-icons/fi';
import { FaSpinner } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import SimpleBar from 'simplebar-react';
import { DebounceInput } from 'react-debounce-input';

import api from '../../services/api';

import Header from '../../components/Header';

import { Container, TableContainer, Pages } from './styles';

interface User {
  data: {
    name: string;
    cpf: string;
    email: string;
    zipcode: string;
    address: string;
    number: string;
    neighborhood: string;
    city: string;
  };
  id: number;
}

const ListUsers: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [page, setPage] = useState<number>(1);

  const history = useHistory();

  const loadUsers = useCallback(() => {
    setLoading(true);
    api
      .get<User[]>(`/usuarios?_sort=id&_order=desc&_page=${page}&_limit=5`)
      .then((response) => {
        setUsers(response.data);
        setLoading(false);
      });
  }, [page]);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const filterUsers = useCallback((text: string) => {
    api
      .get<User[]>(`/usuarios?q=${text}&_sort=id&_order=desc`)
      .then((response) => {
        setFilteredUsers(response.data);
        setLoading(false);
      });
  }, []);

  const handleEditUser = useCallback(
    (id: number) => {
      history.push({
        pathname: `/form-user/${id}`,
        state: { id },
      });
    },
    [history],
  );

  const handleDeleteUser = useCallback(
    async (id: number) => {
      await api.delete(`/usuarios/${id}`);
      toast.success('Usuário removido com sucesso!');
      loadUsers();
    },
    [loadUsers],
  );

  const prevPage = useCallback(() => {
    if (page === 1) return;

    setPage(page - 1);
  }, [page]);

  const nextPage = useCallback(() => {
    if (users.length <= 4) return;

    setPage(page + 1);
  }, [page, users]);

  return (
    <>
      <Header />
      <SimpleBar style={{ maxHeight: '85vh' }}>
        <Container loadingState={loading}>
          <div className="title">
            <strong>Astronautas cadastrados</strong>
          </div>
          <div className="input-search">
            <FiSearch color="#222" size={20} />
            <DebounceInput
              type="text"
              debounceTimeout={500}
              placeholder="Digite um nome para buscar..."
              onChange={(event) => filterUsers(event.target.value)}
            />
          </div>
          {loading ? (
            <div className="spinner">
              <FaSpinner color="#222" size={42} />
            </div>
          ) : (
            <>
              <TableContainer>
                <table>
                  <thead>
                    <tr>
                      <th>Nome</th>
                      <th>CPF</th>
                      <th>E-mail</th>
                      <th>Cidade</th>
                      <th>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers[0]
                      ? filteredUsers.map((user) => (
                          <tr key={user.id} data-testid="users-table">
                            <td>{user.data.name}</td>
                            <td>{user.data.cpf}</td>
                            <td>{user.data.email}</td>
                            <td>{user.data.city}</td>
                            <td className="user-actions">
                              <button
                                type="button"
                                onClick={() => handleEditUser(user.id)}
                              >
                                <FiEdit size={20} color="#3bafda" />
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDeleteUser(user.id)}
                              >
                                <FiTrash2 size={20} color="#ff4b5b" />
                              </button>
                            </td>
                          </tr>
                        ))
                      : users.map((user) => (
                          <tr key={user.id}>
                            <td>{user.data.name}</td>
                            <td>{user.data.cpf}</td>
                            <td>{user.data.email}</td>
                            <td>{user.data.city}</td>
                            <td className="user-actions">
                              <button
                                type="button"
                                onClick={() => handleEditUser(user.id)}
                              >
                                <FiEdit size={20} color="#3bafda" />
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDeleteUser(user.id)}
                              >
                                <FiTrash2 size={20} color="#ff4b5b" />
                              </button>
                            </td>
                          </tr>
                        ))}
                  </tbody>
                </table>
              </TableContainer>
              <Pages>
                <button type="button" onClick={prevPage}>
                  Anterior
                </button>
                <button type="button" onClick={nextPage}>
                  Próxima
                </button>
              </Pages>
            </>
          )}
        </Container>
      </SimpleBar>
    </>
  );
};

export default ListUsers;
