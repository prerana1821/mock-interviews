import { Banner, InfoCards } from "../components";
import React from "react";
import { NextPage } from "next";
import { infoCardsContent } from "../content/infoCards.content";

const Home: NextPage = () => {
  return (
    <div>
      <Banner />
      <InfoCards content={infoCardsContent} />
    </div>
  );
};

export default Home;
