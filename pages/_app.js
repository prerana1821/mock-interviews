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

// export const getInitialProps = async (context) => {
//   // console.log(context.req.cookies);
//   console.log("work");
//   const { token } = context.req.cookies;
//   console.log("hello", { token });
//   console.log({ context });
//   // if(token){
//   //  const response = await fetch('')
//   // }else{

//   // }
// };

export default MyApp;
