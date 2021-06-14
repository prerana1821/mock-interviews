import { useState } from "react";

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const SignInUser = async (e) => {
    e.preventDefault();

    console.log({ username, password });

    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    console.log({ data });
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
