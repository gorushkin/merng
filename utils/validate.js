export const validateRegisterInput = (username, email, password, confirmPassword) => {
  const errors = {};
  if (username.trim() === '') errors.username = 'Username is required';
  if (email.trim() === '') errors.email = 'Email is required';
  if (password === '') {
    errors.password = 'Password is required';
  } else if (confirmPassword !== password) {
    errors.confirmPassword = 'Passowrds are different!!!';
  }
  return { errors, valid: Object.keys(errors).length < 1 };
};

export const validateLoginInput = (username, password) => {
  const errors = {};
  if (username.trim() === '') errors.username = 'Username is required';
  if (password.trim() === '') errors.password = 'Password is required';
  return { errors, valid: Object.keys(errors).length < 1 };
};
