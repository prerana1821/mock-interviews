import { setUserAuth } from "./setUserAuth";
import { loginUser } from "../../serviceCalls";

export const loginUserWithCredentials = async (
  event,
  authDispatch,
  userCredentials,
  router,
  setUserCredentials
) => {
  event.preventDefault();
  if (userCredentials.email && userCredentials.password) {
    // if (/^.{3,32}#[0-9]{4}$/.test(userCredentials.username)) {
    loginUser({
      email: userCredentials.email,
      password: userCredentials.password,
      authDispatch,
      setUserAuth,
      router,
    });
    // } else {
    //   setUserCredentials((state) => ({
    //     ...state,
    //     message: "Enter a valid discord username!",
    //   }));
    // }
  } else {
    setUserCredentials((state) => ({
      ...state,
      message: "All Fields are Required!",
    }));
  }
};
