import footerStyles from "./Footer.module.css";
import Image from "next/image";
import { footerLinks } from "./footerUtils";

export const Footer = () => {
  return (
    <footer className={footerStyles.mainFooter}>
      <p>
        © | 2021 | <span className='blueTxt'>Mocky</span>
      </p>
      <p className='blueTxt'>Mocky by #teamtanay</p>

      <ul className={footerStyles.footerList}>
        {footerLinks.map((link) => {
          return (
            <li key={link.url}>
              <a className='links' href={link.url}>
                <Image src={link.imageSource} width='35px' height='35px' />
              </a>
            </li>
          );
        })}
      </ul>
    </footer>
  );
};
