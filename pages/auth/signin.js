import { useState } from "react";
import { useAuth } from "../../context";
import signInStyles from "../../styles/Form.module.css";
import { ShowPassword } from "../../components";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { signInUserWithCredentials, togglePassword } from "../../utils";

const SignIn = () => {
  const router = useRouter();
  const [userCredentials, setUserCredentials] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    message: "",
    showPassword: false,
    showConfirmPassword: false,
  });

  const { authState, authDispatch } = useAuth();

  const showConfirmPassword = () =>
    setUserCredentials((state) => ({
      ...state,
      showConfirmPassword: !userCredentials.showConfirmPassword,
    }));

  return (
    <div className={signInStyles.login}>
      <form
        onSubmit={(e) =>
          signInUserWithCredentials(
            e,
            userCredentials,
            authDispatch,
            router,
            setUserCredentials
          )
        }
        className={signInStyles.form}
      >
        <h1>Sign Up</h1>
        {authState.status?.loading?.userType && (
          <div className='loading'>
            <Image src='/images/loading.svg' width='200px' height='200px' />
          </div>
        )}
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
            placeholder='Discord Username eg. Name#0000'
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
            showPasswordHandler={() =>
              togglePassword(userCredentials, setUserCredentials)
            }
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
          SignUp
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
