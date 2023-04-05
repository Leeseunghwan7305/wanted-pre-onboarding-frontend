import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { signInApi } from "../../api/signInApi";
import useInput from "../../hook/useInput";
import { emailValidation, passwordValidation } from "../../util/validation";
import "./index.scss";
const SignIn = () => {
  const navigator = useNavigate();
  const [email, emailHandler, emailError] = useInput("", emailValidation);
  const [password, passwordHandler, passwordError] = useInput(
    "",
    passwordValidation
  );
  const buttonRef = useRef<any>(null);

  useEffect(() => {
    if (emailError || passwordError) {
      buttonRef.current.disabled = true;
    } else {
      buttonRef.current.disabled = false;
    }
  }, [emailError, passwordError]);

  const handleSubmit = async () => {
    try {
      const res = await signInApi(email, password);
      const token = res.data.access_token;
      console.log(token);
      localStorage.setItem("token", token);
      navigator("/todo");
      //로컬스토리지에 저장
    } catch (e) {
      console.log(e);
      alert("로그인에 실패하셨습니다");
    }
  };

  return (
    <div className="signInBox">
      <input
        value={email}
        placeholder="이메일을 입력해주세요."
        onChange={emailHandler}
        data-testid="email-input"
      />
      {emailError ? (
        <div className="signUpBox_email-fail">
          이메일형식에 @를 포함해주세요
        </div>
      ) : (
        <div className="signUpBox_email-success"></div>
      )}
      <input
        value={password}
        placeholder="비밀번호를 입력해주세요."
        onChange={passwordHandler}
        data-testid="password-input"
      />
      {passwordError ? (
        <div className="signUpBox_password-fail">
          비밀번호를 8자이상 입력해주세요
        </div>
      ) : (
        <div className="signUpBox_password-success"></div>
      )}
      <button
        ref={buttonRef}
        onClick={handleSubmit}
        data-testid="signup-button"
      >
        로그인
      </button>
      <button onClick={() => navigator("/signup")}>회원가입 하러가기</button>
    </div>
  );
};

export default SignIn;
