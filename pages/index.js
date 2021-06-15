import { Banner } from "../components/Banner";
import { useAuth } from "../context";
import styles from "../styles/Home.module.css";
import { Header } from "./../components/Header";
import { Footer } from "./../components/Footer";

export default function Home() {
  const { user, token } = useAuth();

  console.log({ user, token });

  return (
    <div className={styles.container}>
      <Header />
      <Banner />
      <Footer />
    </div>
  );
}
