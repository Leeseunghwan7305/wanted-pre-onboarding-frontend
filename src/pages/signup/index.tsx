import React, { useState } from "react";
import "./index.scss";

const SignUp = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {};
  return (
    <div className="signUpBox">
      <input onChange={handleEmail} data-testid="email-input" />
      <input onChange={handlePassword} data-testid="password-input" />
      <button onClick={handleSubmit} data-testid="signup-button">
        회원가입
      </button>
    </div>
  );
};

export default SignUp;
