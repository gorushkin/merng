const validateRegisterInput = (username, email, password, confiremPassord) => {
  const errors = {};
  if (username.trim() === '') errors.username = 'Username is required';
  if (email.trim() === '') errors.email = 'Email is required';
  if (password.trim() === '') errors.password = 'Password is required';
};
