import headerStyles from "./Header.module.css";
import Link from "next/link";
import { useAuth } from "../context";

export const Header = () => {
  const { token, user } = useAuth();

  console.log({ token, user });

  return (
    <nav className={headerStyles.nav}>
      <div>
        <Link href='/'>
          <h1>
            <a>Logo</a>
          </h1>
        </Link>
      </div>
      <ul className={headerStyles.navLinks}>
        <Link href='/'>
          <li>
            <a>Home</a>
          </li>
        </Link>
        <Link href='/interviews'>
          <li>
            <a>Interviews</a>
          </li>
        </Link>
        <Link href={token ? `profile/${user._id}` : "/auth/login"}>
          <li>
            <a>{token ? "Account" : "Login"}</a>
          </li>
        </Link>
      </ul>
    </nav>
  );
};
