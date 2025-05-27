export const validateName = (name) => {
  return name.length >= 20 && name.length <= 60;
};

export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validatePassword = (password) => {
  // 8-16 chars, at least one uppercase and one special char
  const re = /^(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,16}$/;
  return re.test(password);
};

export const validateAddress = (address) => {
  return address.length <= 400;
};