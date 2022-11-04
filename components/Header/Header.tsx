import headerStyles from "./Header.module.css";
import Link from "next/link";
import { useAuth, useInterviewSlot } from "../../context";
import Image from "next/image";

export const Header = (): JSX.Element => {
  const { authState, login, logoutUser } = useAuth();
  const { interviewSlotDispatch } = useInterviewSlot();

  return (
    <nav className={headerStyles.nav}>
      <div>
        <Link href='/'>
          <Image
            priority
            src='/images/logo.svg'
            width='150'
            height='50'
            alt='neogcamo logo'
          />
        </Link>
      </div>
      <ul className={headerStyles.navLinks}>
        <Link href='/interviews'>
          <li>
            <a>Available slots</a>
          </li>
        </Link>
        {authState.token ? (
          <Link href={`/profile/${authState.user._id}`}>
            <li>
              <a>Account</a>
            </li>
          </Link>
        ) : (
          <button
            className='btnPrimary'
            style={{ margin: 0 }}
            onClick={() => login()}
          >
            Login with GitHub
          </button>
        )}
        {authState.token && (
          <button
            onClick={() => logoutUser(interviewSlotDispatch)}
            className='btnSecondary'
            style={{ margin: 0 }}
          >
            Logout
          </button>
        )}
      </ul>
    </nav>
  );
};
