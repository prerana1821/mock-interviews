import "../styles/globals.css";
import { InterviewSlotProvider, AuthProvider } from "../context";
import { Layout } from "../components";

function MyApp({ Component, pageProps, token, userId }) {
  console.log(7, token);
  console.log(8, { userId });

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

// class MyApp extends App {
//   render() {
//     const { Component, pageProps, token, userId } = this.props;
//     console.log(9, token);
//     console.log(12, userId);

//     return (
//       <AuthProvider token={token} userId={userId}>
//         <InterviewSlotProvider>
//           <Layout>
//             <Component {...pageProps} />
//           </Layout>
//         </InterviewSlotProvider>
//       </AuthProvider>
//     );
//   }
// }

MyApp.getInitialProps = async (appContext) => {
  const request = appContext.ctx.req;
  let token = request?.cookies?.token;
  let userId = request?.cookies?.userId;
  console.log("32", token);
  console.log("33", userId);
  // const appProps = await App.getInitialProps(appContext);
  return { token, userId };
};

// export const getInitialProps = async (appContext) => {
//   // console.log(appContext);
//   // let authenticated = false;
//   const request = appContext.ctx.req;
//   // console.log(request.cookies);
//   let token = request?.cookies?.token;
//   let userId = request?.cookies?.userId;
//   // const context = appContext.ctx;
//   console.log("32", token);
//   console.log("33", userId);
//   // console.log(context.query.userId);
//   // if (token) {
//   //   // request.cookies = cookie.parse(request.headers.cookie || "");
//   //   // authenticated = !!request.cookies.session;.

//   // }

//   // Call the page's `getInitialProps` and fill `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);

//   // return { ...appProps };
//   return { ...appProps, token, userId };
// };

export default MyApp;
