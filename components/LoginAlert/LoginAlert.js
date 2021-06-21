import styles from "./LoginAlert.module.css";
import Link from "next/link";

export const LoginAlert = ({ setShowLoginAlert }) => {
  return (
    <div className={styles.loginAlert}>
      <div>
        <h1>Ohh No!</h1>
        <h3>Hey, you need to login to connect with people!</h3>
      </div>
      <div className={styles.loginAlertActions}>
        <button
          className='btnSecondary'
          onClick={() => setShowLoginAlert(false)}
        >
          Cancel
        </button>
        <Link href='/auth/login'>
          <button className='btnPrimary'>Login</button>
        </Link>
      </div>
    </div>
  );
};
