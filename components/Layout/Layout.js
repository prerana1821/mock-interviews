import { Footer } from "../Footer/Footer";
import { Header } from "../Header/Header";

export const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      <main className='mainLayout'>{children}</main>
      <Footer />
    </div>
  );
};
