// import footerStyles from './Footer.module.css';
import Image from "next/image";
import { footerLinks } from "./footerUtils";

export const Footer = (): JSX.Element => {
  return (
    <>
      <FooterDesktop />
      <FooterMobile />
    </>
  );
};

function FooterIconLink({
  href,
  imgSrc,
}: {
  href: string;
  imgSrc: string;
}): JSX.Element {
  return (
    <a
      href={href || "/"}
      target='_blank'
      rel='noopener noreferrer'
      className='footer-icons'
    >
      <img src={imgSrc} className='btn-icon' />
    </a>
  );
}

function FooterDesktop(): JSX.Element {
  return (
    <>
      <footer className='text-center footer section footer-container-main footer-desktop'>
        <div className='footer text-container'>
          <span className='text white-text'>Join your developer community</span>
        </div>
        <a
          href='https://bit.ly/team-tanay'
          target='_blank'
          rel='noopener noreferrer'
        >
          <button className='btn btn-discord'>
            <span>
              <img src='/images/discord.svg' className='btn-icon' />
              Welcome to Discord
            </span>
          </button>
        </a>
        <div className='footer-icons-container'>
          <FooterIconLink
            href='https://www.instagram.com/neogcamp'
            imgSrc='/images/instagram.svg'
          />
          <FooterIconLink
            href='https://twitter.com/neogcamp'
            imgSrc='/images/twitter.svg'
          />
          <FooterIconLink
            href='https://www.youtube.com/watch?v=Ezk2AwqgS9Q&list=PLzvhQUIpvvuj5KPnyPyWsvgyzNkX_ACPA'
            imgSrc='/images/youtube.svg'
          />
          <FooterIconLink
            href='https://www.linkedin.com/company/neog-camp/'
            imgSrc='/images/linkedin.svg'
          />
          <FooterIconLink
            href='https://letters.neog.camp/'
            imgSrc='/images/substack.svg'
          />
          <FooterIconLink
            href='https://www.facebook.com/neogcamp'
            imgSrc='/images/facebook.svg'
          />
          <FooterIconLink
            href='https://t.me/teamtanay'
            imgSrc='/images/telegram.svg'
          />
        </div>
      </footer>
      <section className='footer-container-other footer-desktop'>
        <span className='text-s'>© neoG.camp. All rights reserved</span>
      </section>
    </>
  );
}
function FooterMobile(): JSX.Element {
  return (
    <>
      <footer className='text-center footer section footer-container-main footer-mobile'>
        <div className='footer text-container'>
          <span className='text'>Join your developer community</span>
          <a
            href='https://bit.ly/team-tanay'
            target='_blank'
            rel='noopener noreferrer'
          >
            <button className='btn btn-discord'>
              <span>
                <img src='/images/discord.svg' className='btn-icon' />
                Welcome to Discord
              </span>
            </button>
          </a>
        </div>
        <div className='footer-icons-container'>
          <FooterIconLink
            href='https://www.instagram.com/neogcamp'
            imgSrc='/images/instagram.svg'
          />
          <FooterIconLink
            href='https://twitter.com/neogcamp'
            imgSrc='/images/twitter.svg'
          />
          <FooterIconLink
            href='https://www.youtube.com/watch?v=Ezk2AwqgS9Q&list=PLzvhQUIpvvuj5KPnyPyWsvgyzNkX_ACPA'
            imgSrc='/images/youtube.svg'
          />
          <FooterIconLink
            href='https://www.linkedin.com/company/neog-camp/'
            imgSrc='/images/linkedin.svg'
          />
          <FooterIconLink
            href='https://letters.neog.camp/'
            imgSrc='/images/substack.svg'
          />
          <FooterIconLink
            href='https://www.facebook.com/neogcamp'
            imgSrc='/images/facebook.svg'
          />
          <FooterIconLink
            href='https://t.me/teamtanay'
            imgSrc='/images/telegram.svg'
          />
        </div>
      </footer>
      <section className='footer-container-other footer-mobile'>
        <span className='text-s'>© neoG.camp. All rights reserved</span>
      </section>
    </>
  );
}
