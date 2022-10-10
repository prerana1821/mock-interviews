import styles from "./UsernameAlert.module.css";
import Link from "next/link";

export const UsernameAlert = ({ setShowUsernameAlert }) => {
  return (
    <div className={ styles.UsernameAlert }>
      <div>
        <h1>Ohh No!</h1>
        <h3>Hey, you need to fill your discord id before scheduling interviews!</h3>
      </div>
      <div className={ styles.UsernameAlertActions }>
        <button
          className='btnSecondary'
          onClick={ () => setShowUsernameAlert(false) }
        >
          Cancel
        </button>
      </div>
    </div>
  );
};
