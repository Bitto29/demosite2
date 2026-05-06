import React from "react";
import { PageTransition } from "../components/PageTransition";
import { PageHero } from "../components/PageHero";
import { About } from "../components/About";

const AboutPage = () => {
  return (
    <PageTransition>
      <PageHero 
        title="Our Story &" 
        italicTitle="Philosophy" 
        subtitle="About Us"
      />
      {/* We can use the existing About component but we might want to remove its internal spacing/background if redundant */}
      {/* For now, I'll just use it directly, but ensure it looks seamless */}
      <About />
    </PageTransition>
  );
};

export default AboutPage;
