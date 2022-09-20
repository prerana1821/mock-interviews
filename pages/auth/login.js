import { useState } from "react";
import { togglePassword, loginUserWithCredentials } from "../../utils";
import loginStyles from "../../styles/Form.module.css";
import { ShowPassword } from "../../components";
import { useRouter } from "next/router";

import Image from "next/image";
import Link from "next/link";
import { useAuth } from "../../context";

const Login = () => {
  const { user, login } = useAuth();
  const router = useRouter();

  return (
    <div className={loginStyles.login}>
      <form onSubmit={(e) => login} className={loginStyles.form}>
        <h1>Login</h1>

        <button className="btnPrimary" onClick={() => login()} type="submit">
          Login with GitHub
        </button>
      </form>
    </div>
  );
};

export default Login;
