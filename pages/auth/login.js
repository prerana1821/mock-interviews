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
  const { authState, authDispatch } = useAuth();

  const { user, login, signup, logout } = useFirebaseAuth();

  return (
    <div className={loginStyles.login}>
      <form
        onSubmit={(e) =>
          loginUserWithCredentials(
            e,
            authDispatch,
            userCredentials,
            router,
            setUserCredentials
          )
        }
        className={loginStyles.form}
      >
        <h1>Login</h1>
        {authState.status?.loading?.userType && (
          <div className="loading">
            <Image src="/images/loading.svg" width="200px" height="200px" />
          </div>
        )}
        <div className={loginStyles.inputBox}>
          <input
            type="text"
            required
            className={loginStyles.input}
            value={userCredentials.email}
            placeholder="Enter your email"
            onChange={(e) =>
              setUserCredentials((state) => ({
                ...state,
                email: e.target.value,
                message: "",
              }))
            }
          />
          <span className={loginStyles.focusBorder}></span>
        </div>
        <div className={loginStyles.inputBox}>
          <input
            type={userCredentials.showPassword ? "text" : "password"}
            required
            className={loginStyles.input}
            value={userCredentials.password}
            placeholder="Enter your Password"
            onChange={(e) =>
              setUserCredentials((state) => ({
                ...state,
                password: e.target.value,
                message: "",
              }))
            }
          />
          <span className={loginStyles.focusBorder}></span>
          <ShowPassword
            showPasswordHandler={() =>
              togglePassword(userCredentials, setUserCredentials)
            }
            showPassword={userCredentials.showPassword}
          />
        </div>
        <p className={loginStyles.secondaryTxt}>{userCredentials.message}</p>
        <Link href="/auth/forgetPassword">
          <a className={loginStyles.forgetPassword}>
            <em> Forget Password?</em>
          </a>
        </Link>
        {/* <button className="btnPrimary" type="submit">
          Login 
        </button> */}
        <button className="btnPrimary" onClick={() => login()}>
          Login in with GitHub
        </button>

        <button className="btnPrimary" onClick={() => logout()}>
          logout out
        </button>
        <p className={loginStyles.secondaryTxt}>
          Don't have an account?{" "}
          <Link href="/auth/signin">
            <a className="blueTxt">Sign Up!</a>
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
