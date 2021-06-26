export const togglePassword = (userCredentials, setUserCredentials) => {
  return setUserCredentials((state) => ({
    ...state,
    showPassword: !userCredentials.showPassword,
  }));
};
