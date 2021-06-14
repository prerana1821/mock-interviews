import { useState } from "react";
import { useAuth } from "../../context";

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const { signInUser } = useAuth();

  const SignInUser = async (e) => {
    e.preventDefault();

    console.log({ username, password, email });
    signInUser({ username, password, email });
  };

  return (
    <div>
      <form onSubmit={SignInUser}>
        <input
          type='email'
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
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
        <button type='submit'>SignIn</button>
      </form>
    </div>
  );
};

export default SignIn;
