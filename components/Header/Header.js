import headerStyles from './Header.module.css';
import Link from 'next/link';
import { useAuth, useInterviewSlot } from '../../context';
import Image from 'next/image';

export const Header = () => {
  const { authState, login, logoutUser } = useAuth();
  const { interviewSlotDispatch } = useInterviewSlot();

  return (
    <nav className={ headerStyles.nav }>
      <div>
        <Link href="/">
          <a>
            <Image priority src="/images/logo.svg" width="150px" height="50px" alt="neogcamo logo" />
          </a>
        </Link>
      </div>
      <ul className={ headerStyles.navLinks }>
        <Link href="/interviews">
          <li>
            <a>Interviews</a>
          </li>
        </Link>
        { authState.token ? <Link href={ `/profile/${authState.user._id}` }>
          <li>
            <a>Account</a>
          </li>
        </Link> :
          <button className="btnPrimary" style={ { margin: 0 } }
            onClick={ () => login() }
          >
            Login with GitHub
          </button>
        }
        { authState.token && <button
          onClick={ () => logoutUser(interviewSlotDispatch) }
          className='btnSecondary'
          style={ { margin: 0 } }
        >
          Logout
        </button> }
      </ul>
    </nav>
  );
};
