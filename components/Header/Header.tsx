import headerStyles from "./Header.module.css";
import Link from "next/link";
import { useAuth, useInterviewSlot } from "../../context";
import Image from "next/image";

export const Header = (): JSX.Element => {
  const { authState, login, logoutUser } = useAuth();
  const { interviewSlotDispatch } = useInterviewSlot();

  return (
    <nav className={headerStyles.nav}>
      <Link href='/'>
        <Image
          priority
          src='/images/logo.svg'
          width='150'
          height='50'
          alt='neogcamo logo'
        />
      </Link>
      <ul className={headerStyles.navLinks}>
        <Link href='/interviews'>
          <li>Available slots</li>
        </Link>
        {authState.token ? (
          <Link href={`/profile/${authState.user._id}`}>
            <li>Account</li>
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
