import React, { useState, useCallback, FormEvent, ChangeEvent } from 'react';
import InputMask from 'react-input-mask';
import cep from 'cep-promise';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

import api from '../../services/api';

import Header from '../../components/Header';

import { Container, FormContent } from './styles';

const FormUsers: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [cpf, setCpf] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [zipcode, setZipcode] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [number, setNumber] = useState<string>('');
  const [neighborhood, setNeighborhood] = useState<string>('');
  const [city, setCity] = useState<string>('');

  const history = useHistory();

  const handleAssignCEP = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      try {
        const parseZipcode = event.target.value
          .replace('_', '')
          .replace('-', '');
        setZipcode(parseZipcode);

        if (parseZipcode.length < 7) return;

        const response = await cep(parseZipcode);

        setZipcode(response.cep);
        setAddress(response.street);
        setNeighborhood(response.neighborhood);
        setCity(response.city);
      } catch (err) {
        const e = new ErrorEvent('error', {
          message: 'my error',
        });
        window.dispatchEvent(e);
      }
    },
    [],
  );

  const handleSubmit = useCallback(
    async (event: FormEvent) => {
      event?.preventDefault();

      const data = {
        name,
        cpf,
        email,
        zipcode: zipcode.replace('-', ''),
        address,
        number,
        neighborhood,
        city,
      };

      const schema = Yup.object().shape({
        name: Yup.string().required('Nome é obrigatório'),
        cpf: Yup.string().required('CPF é obrigatório'),
        email: Yup.string().required('E-mail é obrigatório').email(),
        zipcode: Yup.string().required('CEP é obrigatório'),
        address: Yup.string().required('Endereço é obrigatório'),
        number: Yup.number().required('Número é obrigatório'),
        neighborhood: Yup.string().required('Bairro é obrigatório'),
        city: Yup.string().required('Cidade é obrigatório'),
      });

      const valid = await schema.isValid(data);

      if (!valid) {
        toast.error('Existem campo(s) inválidos, verificar novamente...');
        return;
      }

      await api.post('/usuarios', {
        data,
      });

      toast.success('Usuário cadastrado com sucesso!');
      history.push('/users');
    },
    [name, cpf, email, zipcode, address, number, neighborhood, city, history],
  );

  return (
    <>
      <Header />
      <Container>
        <div className="title">
          <strong>Cadastrar um astronauta</strong>
        </div>
        <FormContent>
          <form onSubmit={handleSubmit}>
            <div className="form-inputs">
              <div className="form-left">
                <input
                  type="text"
                  placeholder="Nome completo"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <InputMask
                  type="text"
                  mask="999.999.999-99"
                  placeholder="CPF"
                  value={cpf}
                  onChange={(e) => setCpf(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="E-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <InputMask
                  type="text"
                  mask="99999-999"
                  placeholder="CEP"
                  value={zipcode}
                  onChange={handleAssignCEP}
                />
              </div>
              <div className="form-right">
                <input
                  type="text"
                  placeholder="Enderço"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Número"
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Bairro"
                  value={neighborhood}
                  onChange={(e) => setNeighborhood(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Cidade"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
            </div>
            <button type="submit">Cadastrar</button>
          </form>
        </FormContent>
      </Container>
    </>
  );
};

export default FormUsers;
