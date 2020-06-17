import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;

  .title {
    display: flex;
    justify-content: center;
    font-size: 32px;
    color: #222;
  }

  @media (max-width: 800px) {
    flex-direction: column;
    position: relative;
  }
`;

export const FormContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 700px;

  form {
    width: 100%;
    max-width: 250px;
    display: flex;
    flex-direction: column;
    align-items: center;

    .form-inputs {
      display: flex;
      justify-content: center;

      .form-left {
        padding-right: 5px;

        @media (max-width: 800px) {
          padding-right: 0;
        }
      }

      .form-right {
        padding-left: 5px;

        @media (max-width: 800px) {
          padding-left: 0;
        }
      }

      @media (max-width: 800px) {
        flex-direction: column;
        margin-bottom: 20px;
      }
    }

    img {
      width: 250px;
      height: 60px;
    }

    input {
      margin-top: 20px;
      border: 1px solid #ddd;
      border-radius: 4px;
      height: 48px;
      padding: 0 20px;
      font-size: 16px;
      color: #222;

      & + input {
        margin-top: 5px;
      }
    }

    button {
      margin-top: 10px;
      border: 0;
      border-radius: 4px;
      height: 48px;
      font-size: 16px;
      background: #3bafda;
      font-weight: bold;
      color: #fff;
      width: 300px;

      &:hover {
        background-color: ${darken(0.08, '#3bafda')};
      }
    }
  }
`;
