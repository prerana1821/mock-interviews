import { useState } from "react";
import { useAuth } from "../../context";
import loginStyles from "../../styles/Auth.module.css";
import { ShowPassword } from "../../components";
import Link from "next/link";
import Image from "next/image";

const Login = () => {
  const [userCredentials, setUserCredentials] = useState({
    username: "",
    password: "",
    message: "",
    showPassword: false,
  });
  const { authState, loginUser } = useAuth();

  const signInUserWithCredentials = async (e) => {
    e.preventDefault();
    if (userCredentials.username && userCredentials.password) {
      loginUser({
        username: userCredentials.username,
        password: userCredentials.password,
      });
    } else {
      setUserCredentials((state) => ({
        ...state,
        message: "All Fields are Required!",
      }));
    }
  };

  const showPassword = () =>
    setUserCredentials((state) => ({
      ...state,
      showPassword: !userCredentials.showPassword,
    }));

  return (
    <div className={loginStyles.login}>
      <form onSubmit={signInUserWithCredentials} className={loginStyles.form}>
        <h1>Login</h1>
        {authState.status?.loading?.userType && (
          <div className='loading'>
            <Image src='/images/loading.svg' width='200px' height='200px' />
          </div>
        )}
        <div className={loginStyles.inputBox}>
          <input
            type='text'
            required
            className={loginStyles.input}
            value={userCredentials.username}
            placeholder='Enter your Discord Username'
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
            type={userCredentials.showPassword ? "text" : "password"}
            required
            className={loginStyles.input}
            value={userCredentials.password}
            placeholder='Enter your Password'
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
            showPasswordHandler={showPassword}
            showPassword={userCredentials.showPassword}
          />
        </div>
        <p className={loginStyles.secondaryTxt}>{userCredentials.message}</p>
        <button className='btnPrimary' type='submit'>
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

export default Login;
