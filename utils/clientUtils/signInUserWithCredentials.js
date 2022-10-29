import { signInUser } from "../../serviceCalls";
import { setUserAuth } from "./setUserAuth";

export const signInUserWithCredentials = async (
  event,
  userCredentials,
  authDispatch,
  router,
  setUserCredentials
) => {
  event.preventDefault();
  if (
    userCredentials.email &&
    userCredentials.username &&
    userCredentials.password &&
    userCredentials.confirmPassword
  ) {
    if (/^.{3,32}#[0-9]{4}$/.test(userCredentials.username)) {
      if (
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/.test(
          userCredentials.password
        )
      ) {
        if (userCredentials.password === userCredentials.confirmPassword) {
          signInUser({
            username: userCredentials.username,
            password: userCredentials.password,
            email: userCredentials.email,
            authDispatch,
            setUserAuth,
            router,
          });
        } else {
          setUserCredentials((state) => ({
            ...state,
            message: "Passwords doesn't match!",
          }));
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
        message: "Enter a valid discord username!",
      }));
    }
  } else {
    setUserCredentials((state) => ({
      ...state,
      message: "All Fields are Required!",
    }));
  }
};
