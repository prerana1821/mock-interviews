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
  loginUser({
    email: userCredentials.email,
    password: userCredentials.password,
    authDispatch,
    setUserAuth,
    router,
  });

};
