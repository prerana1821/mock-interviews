import { useState } from "react";
import { useAuth } from "../../context";
import loginStyles from "../../styles/Login.module.css";
import Link from "next/link";

const SignIn = () => {
  const [userCredentials, setUserCredentials] = useState({
    username: "",
    password: "",
    message: "",
  });
  const { loginUser } = useAuth();

  const signInUser = async (e) => {
    e.preventDefault();
    if (userCredentials.username && userCredentials.password) {
      console.log({ username, password });
      loginUser({ username, password });
    } else {
      setUserCredentials((state) => ({
        ...state,
        msg: "All Fields are Required!",
      }));
    }
  };

  return (
    <div className={loginStyles.login}>
      <form onSubmit={signInUser} className={loginStyles.form}>
        <h1>Login</h1>
        <div className={loginStyles.inputBox}>
          <input
            type='text'
            required
            className={loginStyles.input}
            value={userCredentials.username}
            placeholder='Enter you Discord Username'
            onChange={(e) =>
              setUserCredentials((state) => ({
                ...state,
                username: e.target.value,
                message: "",
              }))
            }
          />
          <span className={loginStyles.focusBorder}></span>
        </div>
        <div className={loginStyles.inputBox}>
          <input
            type='password'
            required
            className={loginStyles.input}
            value={userCredentials.password}
            placeholder='Enter you Password'
            onChange={(e) =>
              setUserCredentials((state) => ({
                ...state,
                password: e.target.value,
                message: "",
              }))
            }
          />
          <span className={loginStyles.focusBorder}></span>
        </div>
        <p className={loginStyles.secondaryTxt}>{userCredentials.message}</p>
        <button className={loginStyles.btnLogin} type='submit'>
          Login
        </button>
        <p className={loginStyles.secondaryTxt}>
          Don't have an account?{" "}
          <Link href='/auth/signin'>
            <a className='blueTxt'>Sign In!</a>
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignIn;
