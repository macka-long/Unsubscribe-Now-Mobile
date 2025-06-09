export const validateLoginId = (id: string): boolean => {
  const regex = /^[a-zA-Z0-9]{6,16}$/;
  return regex.test(id);
};

export const validatePassword = (pw: string): boolean => {
  const regex = /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]{8,16}$/;
  return regex.test(pw);
};