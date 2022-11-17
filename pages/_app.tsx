import "../styles/globals.css";
import { InterviewSlotProvider, AuthProvider } from "../context";
import React, { ReactComponentElement, ReactNode } from "react";
import { Layout } from "../components";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { ThemeProvider } from "../context/Theme/Theme";

type MyAppProps = {
  Component: any;
  pageProps: any;
  token: string;
  userId: string;
};

function MyApp({ Component, pageProps, token, userId }: MyAppProps) {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <ThemeProvider>
        <AuthProvider token={token} userId={userId}>
          <InterviewSlotProvider token={token}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </InterviewSlotProvider>
        </AuthProvider>
      </ThemeProvider>
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
