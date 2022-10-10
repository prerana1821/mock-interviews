import loginStyles from "../../styles/Form.module.css";
import { useAuth } from "../../context";
import Image from "next/image";

const Login = () => {

  const { authState, login } = useAuth();


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
