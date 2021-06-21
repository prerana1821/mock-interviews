import footerStyles from "./Footer.module.css";
import Image from "next/image";

export const Footer = () => {
  return (
    <footer className={footerStyles.mainFooter}>
      <p>
        © | 2021 | <span className='blueTxt'>Mocky</span>
      </p>
      <p className='blueTxt'>Mocky by #teamtanay</p>

      <ul className={footerStyles.footerList}>
        <li>
          <a className='links' href='mailto: prerananw1@gmail.com'>
            <Image src='/images/instagram.svg' width='35px' height='35px' />
          </a>
        </li>
        <li>
          <a className='links' href='https://github.com/prerana1821'>
            <Image src='/images/github.svg' width='35px' height='35px' />
          </a>
        </li>
        <li>
          <a
            className='links'
            href='https://www.linkedin.com/in/prerana-nawar/'
          >
            <Image src='/images/discord.svg' width='42px' height='42px' />
          </a>
        </li>
        <li>
          <a className='links' href='https://twitter.com/precodes18'>
            <Image src='/images/twitter.svg' width='35px' height='35px' />
          </a>
        </li>
      </ul>
    </footer>
  );
};
