import headerStyles from "./Header.module.css";
import Link from "next/link";
import { useAuth } from "../../context";
import Image from "next/image";

export const Header = () => {
  const { authState } = useAuth();

  return (
    <nav className={headerStyles.nav}>
      <div>
        <Link href='/'>
          <a>
            <Image
              priority
              src='/images/neogcamp.svg'
              width='150px'
              height='50px'
              alt='neogcamo logo'
            />
          </a>
        </Link>
      </div>
      <ul className={headerStyles.navLinks}>
        {!authState.token && (
          <Link href='/'>
            <li>
              <a>Home</a>
            </li>
          </Link>
        )}
        <Link href='/interviews'>
          <li>
            <a>Interviews</a>
          </li>
        </Link>
        <Link
          href={
            authState.token ? `/profile/${authState.user._id}` : "/auth/login"
          }
        >
          <li>
            <a>{authState.token ? "Account" : "Login"}</a>
          </li>
        </Link>
      </ul>
    </nav>
  );
};
