import { useState } from "react";
import { togglePassword } from "../../utils";
import loginStyles from "../../styles/Form.module.css";
import { ShowPassword } from "../../components";
import { useRouter } from "next/router";
import { useAuth } from "../../context";
import Image from "next/image";
import Link from "next/link";
import { forgetPassword } from "../../utils/clientUtils/forgetPassword";

const ForgetPassword = () => {
  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: "",
    message: "",
    showPassword: false,
  });

  const { authState, authDispatch } = useAuth();

  return (
    <div className={loginStyles.login}>
      <form
        onSubmit={(e) =>
          forgetPassword(e, authDispatch, userCredentials, setUserCredentials)
        }
        className={loginStyles.form}
      >
        <h1>Forget Password</h1>
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
            value={userCredentials.email}
            placeholder='Enter your email'
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
            placeholder='Enter new Password'
            value={userCredentials.password}
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
        <button className='btnPrimary' type='submit'>
          Submit
        </button>
        <p className={loginStyles.secondaryTxt}>
          Remember Password?{" "}
          <Link href='/auth/login'>
            <a className='blueTxt'>Login</a>
          </Link>
        </p>
      </form>
    </div>
  );
};

export default ForgetPassword;
