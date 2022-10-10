import "../styles/globals.css";
import {
  InterviewSlotProvider,
  AuthProvider,
} from "../context";
import { Layout } from "../components";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

function MyApp({ Component, pageProps, token, userId }) {
  return (
  <MuiPickersUtilsProvider utils={ DateFnsUtils }>
      <AuthProvider token={ token } userId={ userId }>
        <InterviewSlotProvider token={ token }>
          <Layout>
            <Component { ...pageProps } />
          </Layout>
        </InterviewSlotProvider>
      </AuthProvider>
    </MuiPickersUtilsProvider>
  );
}

MyApp.getInitialProps = async (appContext) => {
  const request = appContext.ctx.req;
  const token = request?.cookies?.token;
  const userId = request?.cookies?.userId;
  return { token, userId };
};

export default MyApp;
