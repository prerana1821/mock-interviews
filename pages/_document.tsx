import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }
  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
        <script src="https://apis.google.com/js/platform.js?onload=triggerGoogleLoaded;   onreadystatechange=if (this.readyState === 'complete') this.onload()"></script>
      </Html>
    );
  }
}
