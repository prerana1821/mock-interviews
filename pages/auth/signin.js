import { useState } from "react";

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const SignInUser = async (e) => {
    e.preventDefault();

    console.log({ username, password, email });

    const response = await fetch("/api/auth/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password, email }),
    });

    const data = await response.json();

    console.log({ data });
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
