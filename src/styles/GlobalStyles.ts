import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
  html,
  body {
    background-color: black;
    font-size: 16px;
    margin: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    border: 0;
    color: white;
    overflow-x: hidden;

    @media (max-width: 767.99px) {
      font-size: 14px;
    }

    @media (max-width: 575.99px) {
      font-size: 12px;
    }
  }

  *,
  *:before,
  *:after {
    font-family: 'VT323', 'Helvetica Neue';
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }

  h1 {
    font-size: 3rem;
    font-weight: normal;
    margin: 0;
  }

  h2 {
    margin: 0;
    font-weight: normal;
    font-size: 2.5rem;
  }

  h3 {
    font-size: 2.3rem;
    font-weight: normal;
    margin: 0;
  }

  p,
  span {
    font-size: 2rem;
    margin: 0;
  }

  button {
    outline: none;
    border: none;
  }

  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  @keyframes fadeOut {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  @keyframes circleExpand {
    0% {
      transform: scale(0.2);
      opacity: 0.5;
    }
    50% {
      transform: scale(1);
      opacity: 0.2;
    }
    100% {
      transform: scale(0.2);
      opacity: 0.5;
    }
  }
`
