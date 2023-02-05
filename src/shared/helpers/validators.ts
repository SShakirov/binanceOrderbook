import {phone} from 'phone';

export const validateEmail = (data : string) => {
  // eslint-disable-next-line max-len, no-useless-escape
  const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  return String(data).toLowerCase().match(re);
};


export const validatePhone = (data : string) => {
  if (!data.includes('+')) data = '+' + data;
  return phone(data).isValid;

  // eslint-disable-next-line max-len, no-useless-escape
  const re = /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/gm;
  return String(data).toLowerCase().match(re);
};
