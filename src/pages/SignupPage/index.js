import React from "react";
import LogoAcademy from "../../images/logo-cubos.svg";
import HiddenPassword from "../../images/hidden-password.svg";
import ShowPassword from "../../images/show-password.svg";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

import "../LoginPage/index.css";

export function SignupPage() {
  const { register, handleSubmit, watch } = useForm();
  const [hiddenPassword, setHiddenPassword] = React.useState("false");

  const email = watch("email");
  const password = watch("password");
  const name = watch("name");

  return (
    <div className="container-form">
      <form
        className="form"
        onSubmit={handleSubmit((data) => {
          console.log(data);
        })}
      >
        <img src={LogoAcademy} alt="Logo da Academy" />
        <label>
          Nome
          <input name="name" ref={register} />
        </label>
        <label>
          Email
          <input
            name="email"
            type="email"
            ref={register}
            placeholder="exemplo@gmail.com"
          />
        </label>
        <label className="container-password">
          Senha
          <input
            className={
              hiddenPassword ? "input-password" : "input-password teste"
            }
            name="password"
            type={hiddenPassword ? "password" : "text"}
            ref={register}
          />
          <button
            type="button"
            onClick={() => {
              setHiddenPassword(!hiddenPassword);
            }}
          >
            <img
              src={hiddenPassword ? HiddenPassword : ShowPassword}
              alt={hiddenPassword ? "Exibir senha" : "Esconder senha"}
            />{" "}
          </button>
        </label>

        <button
          disabled={email && password && name ? false : true}
          className={email && password && name ? "not-disabled" : ""}
        >
          Cadastrar
        </button>
      </form>
      <div className="msg-signup">
        Já possui uma conta? <Link to="/">Acesse aqui!</Link>
      </div>
    </div>
  );
}
