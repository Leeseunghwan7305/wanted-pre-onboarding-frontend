import React from "react";

const SignIn = () => {
  return (
    <div>
      <input data-testid="email-input" />
      <input data-testid="password-input" />
      <button data-testid="signin-button">로그인</button>
    </div>
  );
};

export default SignIn;