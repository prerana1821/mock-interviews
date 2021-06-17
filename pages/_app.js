import "../styles/globals.css";
import { InterviewSlotProvider, AuthProvider } from "../context";
import { Layout } from "../components";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <InterviewSlotProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </InterviewSlotProvider>
    </AuthProvider>
  );
}

export default MyApp;
