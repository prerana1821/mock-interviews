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


  return (
    <div className={ loginStyles.login }>
      <div className={ loginStyles.form }
      >
        <h1>Login</h1>
        { authState.status?.loading?.userType && (
          <div className="loading">
            <Image src="/images/loading.svg" width="200px" height="200px" />
          </div>
        ) }
        <button className="btnPrimary" onClick={ () => login() }>
          Login in with GitHub
        </button>
      </div>
    </div>
  );
};

export default Login;
