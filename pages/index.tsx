import { Banner, InfoCards } from "../components";
import React from "react";
import { NextPage } from "next";
import { infoCardsContent } from "../content/infoCards.content";
import { useTheme } from "../context/Theme/Theme";

const Home: NextPage = () => {
  const { theme } = useTheme();

  return (
    <div style={theme}>
      <Banner />
      <InfoCards content={infoCardsContent} />
    </div>
  );
};

export default Home;
