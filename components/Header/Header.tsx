import headerStyles from "./Header.module.css";
import Link from "next/link";
import { useAuth, useInterviewSlot } from "../../context";
import Image from "next/image";
import { useTheme } from "../../context/Theme/Theme";
import { useState } from "react";

export const Header = (): JSX.Element => {
  const [toggleTheme, setToggleTheme] = useState<boolean>(true);
  const { theme, changeTheme } = useTheme();
  const { authState, login, logoutUser } = useAuth();
  const { interviewSlotDispatch } = useInterviewSlot();

  return (
    <nav className={headerStyles.nav} style={theme}>
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
        <li
          className='nav-item'
          onClick={() => {
            setToggleTheme(!toggleTheme);
            changeTheme(toggleTheme ? "lightTheme" : "darkTheme");
          }}
        >
          {toggleTheme ? (
            <Image
              src={"/images/moon.png"}
              alt='Dark'
              className='dark'
              width={30}
              height='30'
            />
          ) : (
            <Image
              src={"/images/sun.svg"}
              alt='Light'
              className='light'
              width={30}
              height='30'
            />
          )}
        </li>
        <Link href='/interviews'>
          <li className={headerStyles.link}>Available slots</li>
        </Link>
        {authState.token ? (
          <Link href={`/profile/${authState.user._id}`}>
            <li className={headerStyles.link}>Account</li>
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
