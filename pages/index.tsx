import Head from "next/head";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main>
        <h1>
          Welcome to <a href='https://nextjs.org'>Next.js!</a>
        </h1>
      </main>
    </div>
  );
}
// import { Banner, InfoCards } from "../components";
// import React from "react";
// import { NextPage } from "next";
// import { infoCardsContent } from "../content/infoCards.content";

// const Home: NextPage = () => {
//   return (
//     <div>
//       <Banner />
//       <InfoCards content={infoCardsContent} />
//     </div>
//   );
// };

// export default Home;
