import React from "react";
import { PageTransition } from "../components/PageTransition";
import { PageHero } from "../components/PageHero";
import { Gallery } from "../components/Gallery";

const GalleryPage = () => {
  return (
    <PageTransition>
      <PageHero 
        title="Experience the" 
        italicTitle="Atmosphere" 
        subtitle="Gallery"
      />
      <Gallery />
    </PageTransition>
  );
};

export default GalleryPage;
