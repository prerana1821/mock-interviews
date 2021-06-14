import { useState } from "react";
import { useAuth } from "../../context";

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { loginUser } = useAuth();

  const SignInUser = async (e) => {
    e.preventDefault();
    console.log({ username, password });
    loginUser({ username, password });
  };

  return (
    <div>
      <form onSubmit={SignInUser}>
        <input
          type='text'
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type='password'
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type='submit'>Login</button>
      </form>
    </div>
  );
};

export default SignIn;
