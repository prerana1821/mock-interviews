import { Banner } from "../components/Banner";
import { useAuth } from "../context";
import styles from "../styles/Home.module.css";

export default function Home() {
  const { user, token } = useAuth();

  console.log({ user, token });

  return (
    <div className={styles.container}>
      <Banner />
    </div>
  );
}
