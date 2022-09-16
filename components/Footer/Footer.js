// import footerStyles from './Footer.module.css';
import Image from 'next/image';
import { footerLinks } from './footerUtils';

export const Footer = () => {
  function FooterIconLink({ href, imgSrc }) {
    return (
      <a href={href || '/'} target="_blank" rel="noopener noreferrer" className="footer-icons">
        <img src={imgSrc} className="btn-icon" />
      </a>
    );
  }

  function FooterDesktop() {
    return (
      <>
        <footer className="text-center footer section footer-container-main footer-desktop">
          <div className="footer text-container">
            <span className="text">Join your developer community</span>
          </div>
          <a href="https://bit.ly/team-tanay" target="_blank" rel="noopener noreferrer">
            <button className="btn btn-discord">
              <span>
                <img src="/images/discord.svg" className="btn-icon" />
                Welcome to Discord
              </span>
            </button>
          </a>
          <div className="footer-icons-container">
            <FooterIconLink href="https://www.instagram.com/neogcamp" imgSrc="/images/instagram.svg" />
            <FooterIconLink href="https://twitter.com/neogcamp" imgSrc="/images/twitter.svg" />
            <FooterIconLink href="https://www.youtube.com/watch?v=Ezk2AwqgS9Q&list=PLzvhQUIpvvuj5KPnyPyWsvgyzNkX_ACPA" imgSrc="/images/youtube.svg" />
            <FooterIconLink href="https://www.linkedin.com/company/neog-camp/" imgSrc="/images/linkedin.svg" />
            <FooterIconLink href="https://letters.neog.camp/" imgSrc="/images/substack.svg" />
            <FooterIconLink href="https://www.facebook.com/neogcamp" imgSrc="/images/facebook.svg" />
            <FooterIconLink href="https://t.me/teamtanay" imgSrc="/images/telegram.svg" />
          </div>
          {/* <div className="footer links-container">
            <a href="/legal/tnc" className="footer link">
              Terms
            </a>
            <a href="/legal/privacy" className="footer link">
              Privacy Policy
            </a>
            <a href="/legal/refund" className="footer link">
              Refund Policy
            </a>
            <a href="/legal/communityguide" className="footer link">
              Community Guidelines
            </a>
          </div> */}
        </footer>
        <section className="footer-container-other footer-desktop">
          <span className="text-s">© neoG.camp. All rights reserved</span>
        </section>
      </>
    );
  }

  function FooterMobile() {
    return (
      <>
        <footer className="text-center footer section footer-container-main footer-mobile">
          <div className="footer text-container">
            <span className="text">Join your developer community</span>
            <a href="https://bit.ly/team-tanay" target="_blank" rel="noopener noreferrer">
              <button className="btn btn-discord">
                <span>
                  <img src="/images/discord.svg" className="btn-icon" />
                  Welcome to Discord
                </span>
              </button>
            </a>
          </div>
          <div className="footer-icons-container">
            <FooterIconLink href="https://www.instagram.com/neogcamp" imgSrc="/images/instagram.svg" />
            <FooterIconLink href="https://twitter.com/neogcamp" imgSrc="/images/twitter.svg" />
            <FooterIconLink href="https://www.youtube.com/watch?v=Ezk2AwqgS9Q&list=PLzvhQUIpvvuj5KPnyPyWsvgyzNkX_ACPA" imgSrc="/images/youtube.svg" />
            <FooterIconLink href="https://www.linkedin.com/company/neog-camp/" imgSrc="/images/linkedin.svg" />
            <FooterIconLink href="https://letters.neog.camp/" imgSrc="/images/substack.svg" />
            <FooterIconLink href="https://www.facebook.com/neogcamp" imgSrc="/images/facebook.svg" />
            <FooterIconLink href="https://t.me/teamtanay" imgSrc="/images/telegram.svg" />
          </div>
        </footer>
        <section className="footer-container-other footer-mobile">
          {/* <div className="mt-1 mb-1 footer links-container-mob">
            <a href="/legal/tnc" className="footer link">
              Terms
            </a>
            <a href="/legal/privacy" className="footer link">
              Privacy Policy
            </a>
            <a href="/legal/refund" className="footer link">
              Refund Policy
            </a>
          </div>
          <div className="mb-1 footer links-container-mob">
            <a href="/legal/communityguide" className="footer link">
              Community Guidelines
            </a>
          </div> */}
          <span className="text-s">© neoG.camp. All rights reserved</span>
        </section>
      </>
    );
  }

  return (
    <>
      <FooterDesktop />
      <FooterMobile />
    </>
  );
};
