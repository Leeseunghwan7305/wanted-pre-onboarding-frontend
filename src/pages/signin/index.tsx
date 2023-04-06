import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { signInApi } from "../../api/signInApi";
import useInput from "../../hook/useInput";
import { tokenTest } from "../../util/tokenTest";
import { emailValidation, passwordValidation } from "../../util/validation";
import "./index.scss";
const SignIn = () => {
  const navigator = useNavigate();

  //email,password의 유효성여부와 값을 가지고있는 custom hook입니다.
  const [email, emailHandler, emailError] = useInput("", emailValidation);
  const [password, passwordHandler, passwordError] = useInput(
    "",
    passwordValidation
  );

  const buttonRef = useRef<HTMLButtonElement>(null);

  //email과password유효성검사여부에 따라 버튼을 활성/비활성화해주는 함수입니다.
  useEffect(() => {
    if (emailError || passwordError) {
      buttonRef.current!.disabled = true;
    } else {
      buttonRef.current!.disabled = false;
    }
  }, [emailError, passwordError]);

  useEffect(() => {
    if (tokenTest()) {
      navigator("/todo", { replace: true });
    }
  }, []);

  //로그인 버튼을 눌렀을때 실행되는 함수입니다.
  const handleSubmit = async () => {
    try {
      const res = await signInApi(email, password);
      const token = res.data.access_token;
      localStorage.setItem("token", token);
      navigator("/todo");
    } catch (e) {
      console.log(e);
      alert("로그인에 실패하셨습니다");
    }
  };
  return (
    <div className="signInBox">
      <h1>로그인</h1>
      <input
        className="signInBox-email"
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
        className="signInBox-password"
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
        data-testid="signin-button"
      >
        로그인
      </button>
      <button onClick={() => navigator("/signup")}>회원가입 하러가기</button>
    </div>
  );
};

export default SignIn;
