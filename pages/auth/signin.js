import { useState } from "react";
import { useAuth } from "../../context";
import signInStyles from "../../styles/Auth.module.css";
import Link from "next/link";
import { ShowPassword } from "../../components";

const SignIn = () => {
  const [userCredentials, setUserCredentials] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    message: "",
    showPassword: false,
    showConfirmPassword: false,
  });

  const { signInUser } = useAuth();

  const signInUserWithCredentials = async (e) => {
    e.preventDefault();

    console.log({ userCredentials });
    if (
      userCredentials.email &&
      userCredentials.username &&
      userCredentials.password &&
      userCredentials.confirmPassword
    ) {
      if (/^.{3,32}#[0-9]{4}$/.test(userCredentials.username)) {
        signInUser({
          username: userCredentials.username,
          password: userCredentials.password,
          email: userCredentials.confirmPassword,
        });
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

  const showPassword = () =>
    setUserCredentials((state) => ({
      ...state,
      showPassword: !userCredentials.showPassword,
    }));

  const showConfirmPassword = () =>
    setUserCredentials((state) => ({
      ...state,
      showConfirmPassword: !userCredentials.showConfirmPassword,
    }));

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
            placeholder='Enter your Discord username'
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
            type={userCredentials.showPassword ? "text" : "password"}
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
          <ShowPassword
            showPasswordHandler={showPassword}
            showPassword={userCredentials.showPassword}
          />
        </div>
        <div className={signInStyles.inputBox}>
          <input
            type={userCredentials.showConfirmPassword ? "text" : "password"}
            required
            placeholder='Enter Confirm Password'
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
          <ShowPassword
            showPasswordHandler={showConfirmPassword}
            showConfirmPassword={userCredentials.showConfirmPassword}
          />
        </div>
        <p>{userCredentials.message}</p>
        <button className='btnPrimary' type='submit'>
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
