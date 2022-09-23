import Header from "./Header";
import { useState } from "react";

const Login = ({ onLogin }) => {
  const [loginData, setLoginData] = useState({
    password: "",
    email: "",
  });

  const hendleChangeInput = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { password, email } = loginData;
    onLogin(password, email);
  };

  return (
    <>
      <Header textLink={"Регистрация"} toLink={"/sign-up"} />
      <form className="register" action="#" onSubmit={handleSubmit}>
        <fieldset className="register__fieldset">
          <h2 className="register__title">Вход</h2>

          <label className="register__form-field">
            <input
              className="register__input"
              type="email"
              name="email"
              placeholder="Email"
              autoComplete="off"
              onChange={hendleChangeInput}
              value={loginData.email}
              minLength="5"
              maxLength="40"
              required
            />
          </label>
          <label className="register__form-field">
            <input
              className="register__input"
              type="password"
              name="password"
              placeholder="Пароль"
              autoComplete="off"
              onChange={hendleChangeInput}
              value={loginData.password}
              minLength="5"
              maxLength="40"
              required
            />
          </label>
          <button type="submit" className="register__submit-btn">
            Войти
          </button>
        </fieldset>
      </form>
    </>
  );
};

export default Login;
