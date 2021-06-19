import "../styles/globals.css";
import { InterviewSlotProvider, AuthProvider } from "../context";
import { Layout } from "../components";

function MyApp({ Component, pageProps, token, userId }) {
  return (
    <AuthProvider token={token} userId={userId}>
      <InterviewSlotProvider token={token}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </InterviewSlotProvider>
    </AuthProvider>
  );
}

MyApp.getInitialProps = async (appContext) => {
  const request = appContext.ctx.req;
  let token = request?.cookies?.token;
  let userId = request?.cookies?.userId;
  return { token, userId };
};

export default MyApp;
