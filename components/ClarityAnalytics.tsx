"use client";

import Script from "next/script";

/**
 * Injecte le tag Microsoft Clarity uniquement si
 * NEXT_PUBLIC_CLARITY_ID est défini ET non vide.
 *
 * Chargé via next/script avec strategy="afterInteractive" pour ne
 * pas bloquer l'hydratation ni le LCP. Monté en fin de <body> dans
 * app/layout.tsx. Ne rend absolument rien visuellement : le
 * composant retourne le <Script> lui-même ou null.
 */

export function ClarityAnalytics() {
  const clarityId = process.env.NEXT_PUBLIC_CLARITY_ID;

  if (!clarityId || clarityId.trim() === "") {
    return null;
  }

  return (
    <Script
      id="clarity-analytics"
      strategy="afterInteractive"
      src={`https://www.clarity.ms/tag/${clarityId}`}
    />
  );
}
