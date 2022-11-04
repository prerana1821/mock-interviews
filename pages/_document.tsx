import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
  return (
    <Html>
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
      <script src='https://apis.google.com/js/platform.js?onload=triggerGoogleLoaded'></script>
      {/* <Script type='text/javascript'>
        {`function triggerGoogleLoaded() {
            console.log("google event loaded");
            window.dispatchEvent(new Event('google-loaded'));
        }`}
      </Script> */}
    </Html>
  );
}
