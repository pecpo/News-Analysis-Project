import React from "react";
import Hero from "../components/Hero";
import NewsCardsTab from "../components/NewsCardsTab";

const HomePage = () => {
  return (
    <>
      <Hero />
      <NewsCardsTab title="World" />
      <NewsCardsTab title="Policy" />
      <NewsCardsTab title="Business" />
    </>
  );
};

export default HomePage;
