import { useState } from "react";
import { togglePassword, loginUserWithCredentials } from "../../utils";
import loginStyles from "../../styles/Form.module.css";
import { ShowPassword } from "../../components";
import { useRouter } from "next/router";
import { useAuth, useFirebaseAuth } from "../../context";
import Image from "next/image";
import Link from "next/link";

const Login = () => {
  const router = useRouter();
  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: "",
    message: "",
    showPassword: false,
  });
  const { authState, authDispatch, login } = useAuth();

  // const { user, login, signup, logout } = useFirebaseAuth();

  return (
    <div className={ loginStyles.login }>
      {/* <form
        onSubmit={ (e) =>
          loginUserWithCredentials(
            e,
            authDispatch,
            userCredentials,
            router,
            setUserCredentials
          )
        }
        className={ loginStyles.form }
      > */}
      <h1>Login</h1>
      { authState.status?.loading?.userType && (
        <div className="loading">
          <Image src="/images/loading.svg" width="200px" height="200px" />
        </div>
      ) }

      {/* <button className="btnPrimary" type="submit">
          Login 
        </button> */}

      <button className="btnPrimary" onClick={ () => login() }>
        Login in with GitHub
      </button>

      {/* <button className="btnPrimary" onClick={ () => logout() }>
        logout out
      </button> */}

      {/* </form> */ }
    </div>
  );
};

export default Login;
