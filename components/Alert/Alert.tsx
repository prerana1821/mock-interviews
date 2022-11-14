import styles from "./Alert.module.css";
import { ReactNode } from "react";

export interface AlertProps {
  title: string;
  description: string;
  actions: ReactNode;
}

export const Alert = ({ title, description, actions }: AlertProps) => {
  return (
    <div className={styles.Alert}>
      <div>
        <h1>{title}</h1>
        <h3>{description}</h3>
      </div>
      <div className={styles.AlertActions}>{actions}</div>
    </div>
  );
};

// export const UsernameAlert = ({ setShowUsernameAlert }) => {
//   return (
//     <div className={styles.UsernameAlert}>
//       <div>
//         <h1>Ohh No!</h1>
//         <h3>
//           Hey, you need to fill your discord id before scheduling interviews!
//         </h3>
//       </div>
//       <div className={styles.UsernameAlertActions}>
//         <button
//           className='btnSecondary'
//           onClick={() => setShowUsernameAlert(false)}
//         >
//           Cancel
//         </button>
//       </div>
//     </div>
//   );
// };
