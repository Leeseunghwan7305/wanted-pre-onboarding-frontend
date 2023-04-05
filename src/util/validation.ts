export const emailValidation = (email: string) => {
  const pattern = /@/;
  if (pattern.test(email)) {
    return true;
  } else {
    return false;
  }
};

export const passwordValidation = (password: string) => {
  const pattern = /^.{8,}$/;
  if (pattern.test(password)) {
    return true;
  } else {
    return false;
  }
};
