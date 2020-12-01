import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

import { createContainer } from "unstated-next";

function useLogin() {
  const [token, setToken] = React.useState(localStorage.getItem("token"));

  function login(email, senha) {
    fetch(`http://localhost:8081/auth`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, senha }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.dados.token) {
          setToken(res.dados.token);
          localStorage.setItem("token", res.dados.token);
        }
      });
  }

  React.useEffect(() => {
    console.log("token login", token);
  }, [token]);

  function logout() {
    setToken(null);
    localStorage.clear();
  }

  return { token, login, logout };
}

export const LoginContainer = createContainer(useLogin);

ReactDOM.render(
  <React.StrictMode>
    <LoginContainer.Provider>
      <App />
    </LoginContainer.Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
