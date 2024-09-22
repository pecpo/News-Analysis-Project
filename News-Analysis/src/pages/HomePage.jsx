import React from "react";
import Hero from "../components/Hero";
import NewsCardsTab from "../components/NewsCardsTab";

const HomePage = () => {
  return (
    <>
      <Hero />
      <NewsCardsTab country={"US"} />
      <NewsCardsTab country={"IN"} />
    </>
  );
};

export default HomePage;
