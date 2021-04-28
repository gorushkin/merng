import { useState } from 'react';

export const useForm = (callback, initialstate = {}) => {
  const [values, setValues] = useState(initialstate);

  const onChange = (e) => {
    setValues((state) => ({ ...state, [e.target.name]: e.target.value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    callback();
  };

  return { values, onChange, onSubmit };
};
