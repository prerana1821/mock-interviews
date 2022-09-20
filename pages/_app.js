import "../styles/globals.css";
import { InterviewSlotProvider, AuthProvider } from "../context";
import { Layout } from "../components";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { AuthContextProvider } from "../context/FirebaseAuthProvider";

const noAuthRequired = ["/", "/auth/login"];

function MyApp({ Component, pageProps }) {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <AuthContextProvider>
        <InterviewSlotProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </InterviewSlotProvider>
      </AuthContextProvider>
    </MuiPickersUtilsProvider>
  );
}

export default MyApp;
