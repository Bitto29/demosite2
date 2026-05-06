import React from "react";
import { PageTransition } from "../components/PageTransition";
import { PageHero } from "../components/PageHero";
import { Contact } from "../components/Contact";

const ContactPage = () => {
  return (
    <PageTransition>
      <PageHero 
        title="Come Say" 
        italicTitle="Hello" 
        subtitle="Contact Us"
      />
      <Contact />
    </PageTransition>
  );
};

export default ContactPage;
