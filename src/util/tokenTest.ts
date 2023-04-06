//토큰의 유무를 판별해주는 함수입니다.
export const tokenTest = () => {
  const tokenCheck = localStorage.getItem("token");
  if (tokenCheck) {
    return true;
  } else {
    return false;
  }
};
