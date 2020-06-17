import styled, { keyframes, css } from 'styled-components';

interface ContainerProps {
  loadingState: boolean;
}

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const Container = styled.div`
  margin-top: 20px;
  margin-bottom: 50px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  ${(props: ContainerProps) =>
    props.loadingState &&
    css`
      .spinner {
        display: flex;
        justify-content: center;
        align-items: center;

        svg {
          animation: ${rotate} 2s linear infinite;
          margin-top: 50px;
        }
      }
    `}

  .title {
    display: flex;
    justify-content: center;
    font-size: 32px;
    color: #222;
  }

  .input-search {
    background: #fff;
    border-radius: 8px;
    padding: 16px;
    width: 350px;
    display: flex;
    align-items: center;
    margin-top: 20px;

    input {
      border: 0;
      padding: 5px;
      background: none;
      width: 100%;
      color: #222;
    }
  }
`;

export const TableContainer = styled.section`
  margin-top: 20px;

  table {
    width: 100%;
    border-spacing: 0 8px;

    th {
      color: #999;
      font-weight: normal;
      padding: 20px 32px;
      text-align: left;
      font-size: 16px;
      line-height: 24px;
    }

    td {
      padding: 20px 32px;
      border: 0;
      background: #fff;
      font-size: 16px;
      color: #222;
    }

    .user-actions {
      button {
        background: transparent;
        border: 0;
        color: #fff;
        transition: 0.2s;

        &:hover {
          opacity: 0.6;
        }
      }

      > button {
        margin-right: 5px;
      }
    }

    td:first-child {
      border-radius: 8px 0 0 8px;
    }
    td:last-child {
      border-radius: 0 8px 8px 0;
    }
  }
`;

export const Pages = styled.div`
  width: 15%;
  display: flex;
  justify-content: space-between;

  button {
    border-radius: 8px;
    background: #222;
    padding: 10px;
    border: 0;
    color: #fff;
    transition: 0.2s;

    &:hover {
      opacity: 0.6;
    }
  }
`;
