import headerStyles from "./Header.module.css";
import Link from "next/link";

export const Header = () => {
  return (
    <nav className={headerStyles.nav}>
      <div>
        <h1>Logo1</h1>
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
        <Link href='/auth/login'>
          <li>
            <a>Login</a>
          </li>
        </Link>
      </ul>
    </nav>
  );
};
