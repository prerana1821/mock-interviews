export const forgetPassword = async (
  event,
  authDispatch,
  userCredentials,
  setUserCredentials
) => {
  event.preventDefault();
  if (userCredentials.email && userCredentials.password) {
    if (
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/.test(
        userCredentials.password
      )
    ) {
      try {
        authDispatch({
          type: "SET_STATUS",
          payload: {
            status: { loading: { userType: "Changing Password..." } },
          },
        });
        console.log({
          email: userCredentials.email,
          password: userCredentials.password,
        });
        const response = await fetch("/api/auth/forgetPassword", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: userCredentials.email,
            password: userCredentials.password,
          }),
        });

        const data = await response.json();
        if (data.success) {
          authDispatch({
            type: "SET_STATUS",
            payload: {
              status: { success: data.message },
            },
          });
        } else {
          authDispatch({
            type: "SET_STATUS",
            payload: { status: { error: data.errorMessage } },
          });
        }
      } catch (error) {
        console.log({ error });
        authDispatch({
          type: "SET_STATUS",
          payload: { status: { error: "Couldn't change password..." } },
        });
      }
    } else {
      setUserCredentials((state) => ({
        ...state,
        message:
          "Passwords must be minimum eight characters, at least one letter and one number!",
      }));
    }
  } else {
    setUserCredentials((state) => ({
      ...state,
      message: "All Fields are Required!",
    }));
  }
};
