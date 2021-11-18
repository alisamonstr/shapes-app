import React from 'react'
import ReactDOM from 'react-dom'
import { createGlobalStyle } from 'styled-components'

import { App } from './App'

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: "Roboto";
  }
`

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
)
