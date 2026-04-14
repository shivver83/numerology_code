import React from 'react';

export default function SEO({ title, description, canonicalUrl, keywords }) {
  const siteName = "Happiness Creations";
  // Ye aapka title banayega: "Page Name | Happiness Creations"
  const fullTitle = `${title} | ${siteName}`;

  return (
    <>
      {/* 1. Basic SEO Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      
      {/* 2. Canonical URL (Duplicate content se bachne ke liye) */}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

      {/* 3. Open Graph Tags (Facebook, LinkedIn, WhatsApp par share karne ke liye) */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content={siteName} />
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}
      
      {/* Optional: Agar aapki koi logo image hai jo share karte time dikhani hai */}
      {/* <meta property="og:image" content="https://happinessccreattions.in/images/logo.png" /> */}

      {/* 4. Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
    </>
  );
}
