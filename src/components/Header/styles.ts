import styled from 'styled-components';

export const Container = styled.div`
  padding: 16px 0;
  background: #222;
`;

export const HeaderContent = styled.div`
  max-width: 1120px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;

  div {
    display: flex;
    align-items: center;
  }

  img {
    width: 250px;
    height: 60px;
  }

  button {
    background: transparent;
    border: 0;
    color: #fff;
    display: flex;
    align-items: center;
    transition: transform 0.2s;

    &:hover {
      transform: translateY(-2px);
    }

    > svg {
      margin-right: 5px;
    }
  }
`;

export const Menu = styled.div`
  > a {
    margin-right: 20px;
  }

  a {
    text-decoration: none;
    color: #fff;
    transition: transform 0.2s;

    &:hover {
      transform: translateY(-2px);
    }
  }
`;

export const Profile = styled.div`
  margin-left: 30px;
  display: flex;
  flex-direction: column;

  span {
    color: #a7a9ac;
    margin-right: auto;
  }

  strong {
    color: #fff;
  }
`;
