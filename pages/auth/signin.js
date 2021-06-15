import { useState } from "react";
import { useAuth } from "../../context";
import signInStyles from "../../styles/Auth.module.css";
import Link from "next/link";

const SignIn = () => {
  const [userCredentials, setUserCredentials] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    message: "",
  });

  const { signInUser } = useAuth();

  const signInUserWithCredentials = async (e) => {
    e.preventDefault();

    console.log({ userCredentials });
    signInUser({
      username: userCredentials.username,
      password: userCredentials.password,
      email: userCredentials.confirmPassword,
    });
  };

  return (
    <div className={signInStyles.login}>
      <form onSubmit={signInUserWithCredentials} className={signInStyles.form}>
        <h1>Sign In</h1>
        <div className={signInStyles.inputBox}>
          <input
            type='email'
            required
            value={userCredentials.email}
            className={signInStyles.input}
            placeholder='Enter your Email Id'
            onChange={(e) =>
              setUserCredentials((state) => ({
                ...state,
                email: e.target.value,
                message: "",
              }))
            }
          />
          <span className={signInStyles.focusBorder}></span>
        </div>
        <div className={signInStyles.inputBox}>
          <input
            type='text'
            required
            className={signInStyles.input}
            placeholder='Enter your Username'
            value={userCredentials.username}
            onChange={(e) =>
              setUserCredentials((state) => ({
                ...state,
                username: e.target.value,
                message: "",
              }))
            }
          />
          <span className={signInStyles.focusBorder}></span>
        </div>

        <div className={signInStyles.inputBox}>
          <input
            type='password'
            required
            className={signInStyles.input}
            placeholder='Enter Password'
            value={userCredentials.password}
            onChange={(e) =>
              setUserCredentials((state) => ({
                ...state,
                password: e.target.value,
                message: "",
              }))
            }
          />
          <span className={signInStyles.focusBorder}></span>
        </div>
        <div className={signInStyles.inputBox}>
          <input
            type='password'
            required
            placeholder='Enter Confirmation Password'
            className={signInStyles.input}
            value={userCredentials.confirmPassword}
            onChange={(e) =>
              setUserCredentials((state) => ({
                ...state,
                confirmPassword: e.target.value,
                message: "",
              }))
            }
          />
          <span className={signInStyles.focusBorder}></span>
        </div>
        <button className={signInStyles.btnLogin} type='submit'>
          SignIn
        </button>
        <p className={signInStyles.secondaryTxt}>
          Already a User?{" "}
          <Link href='/auth/login'>
            <a className='blueTxt'>Login!</a>
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignIn;
