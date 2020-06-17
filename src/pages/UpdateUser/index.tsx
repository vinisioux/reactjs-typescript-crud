import React, {
  useEffect,
  useState,
  useCallback,
  FormEvent,
  ChangeEvent,
} from 'react';
import InputMask from 'react-input-mask';
import cep from 'cep-promise';
import * as Yup from 'yup';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { toast } from 'react-toastify';

import api from '../../services/api';

import Header from '../../components/Header';

import { Container, FormContent } from './styles';

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

interface UserParams {
  id: string;
}

const UpdateUser: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [cpf, setCpf] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [zipcode, setZipcode] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [number, setNumber] = useState<string>('');
  const [neighborhood, setNeighborhood] = useState<string>('');
  const [city, setCity] = useState<string>('');

  const history = useHistory();

  const { params } = useRouteMatch<UserParams>();

  useEffect(() => {
    api
      .get<User[]>(`/usuarios?id=${params.id}`)
      .then((response) => {
        setName(response.data[0].data.name);
        setCpf(response.data[0].data.cpf);
        setZipcode(response.data[0].data.zipcode);
        setAddress(response.data[0].data.address);
        setEmail(response.data[0].data.email);
        setNumber(response.data[0].data.number);
        setNeighborhood(response.data[0].data.neighborhood);
        setCity(response.data[0].data.city);
      })
      .catch((err) => console.log(err));
  }, [params.id]);

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

      await api.put(`/usuarios/${params.id}`, {
        data,
      });
      toast.success('Dados atualizados!');
      history.push('/users');
    },
    [
      name,
      cpf,
      email,
      zipcode,
      address,
      number,
      neighborhood,
      city,
      history,
      params.id,
    ],
  );

  return (
    <>
      <Header />
      <Container>
        <div className="title">
          <strong>Atualizar dados</strong>
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
                  type="email"
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
            <button type="submit">Atualizar</button>
          </form>
        </FormContent>
      </Container>
    </>
  );
};

export default UpdateUser;
