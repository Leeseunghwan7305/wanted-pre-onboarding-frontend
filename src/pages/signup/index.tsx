import React, { useState } from "react";
import { signUpApi } from "../../api/signUpApi";
import "./index.scss";

const SignUp = () => {
  const [email, setEmail] = useState<string>("");
  const [emailCheck, setEmailCheck] = useState<boolean>();
  const [password, setPassword] = useState<string>("");
  const [passwordCheck, setPasswordCheck] = useState<boolean>();

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    const email = e.target.value;
    const pattern = /@/;
    if (pattern.test(email)) {
      setEmailCheck(true);
    } else {
      setEmailCheck(false);
    }
  };

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    const password = e.target.value;
    const pattern = /^.{8,}$/;
    if (pattern.test(password)) {
      setPasswordCheck(true);
    } else {
      setPasswordCheck(false);
    }
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    await signUpApi(email, password);
    setEmail("");
    setPassword("");
  };
  return (
    <div className="signUpBox">
      <input onChange={handleEmail} data-testid="email-input" />
      {emailCheck ? (
        <div className="signUpBox_email-success"></div>
      ) : (
        <div className="signUpBox_email-fail">
          이메일형식에 @를 포함해주세요
        </div>
      )}
      <input onChange={handlePassword} data-testid="password-input" />
      {passwordCheck ? (
        <div className="signUpBox_password-success"></div>
      ) : (
        <div className="signUpBox_password-fail">
          비밀번호를 8자이상 입력해주세요
        </div>
      )}
      <button onClick={handleSubmit} data-testid="signup-button">
        회원가입
      </button>
    </div>
  );
};

export default SignUp;
