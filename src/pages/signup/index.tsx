import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { signUpApi } from "../../api/signUpApi";
import useInput from "../../hook/useInput";
import { emailValidation, passwordValidation } from "../../util/validation";
import "./index.scss";

const SignUp = () => {
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
      await signUpApi(email, password);
      alert("회원가입에 성공하셨습니다 !");
      navigator("/signin");
    } catch (e) {
      alert("회원가입에 실패하였습니다 !");
    }
  };

  return (
    <div className="signUpBox">
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
        회원가입
      </button>
      <button onClick={() => navigator("/signin")}>로그인하러가기</button>
    </div>
  );
};

export default SignUp;
