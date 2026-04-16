import { ImageResponse } from "next/og";

/**
 * Open Graph image générée à la volée à /opengraph-image.
 * Convention Next.js 15 : le fichier est automatiquement injecté
 * dans <meta property="og:image"> et <meta name="twitter:image">
 * (via twitter-image.tsx qui délègue ici).
 *
 * Palette : noir profond #0A0A0A, or mat signature #C9A84C, bone
 * #F8F6F0. Gradient radial discret + pattern points dorés faibles
 * pour casser le plat. Aucun asset externe : tout est rendu en JSX
 * avec CSS inline et typographie serif système pour rester léger.
 */

export const runtime = "edge";

export const alt = "H&L Conciergerie · Gestion locative premium à Nice";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 88px",
          backgroundColor: "#0A0A0A",
          backgroundImage:
            "radial-gradient(ellipse 70% 55% at 50% 30%, rgba(201,168,76,0.18) 0%, rgba(201,168,76,0.05) 45%, transparent 75%), radial-gradient(circle at 12% 88%, rgba(201,168,76,0.1) 0%, transparent 55%)",
          color: "#F8F6F0",
          fontFamily: "Georgia, 'Times New Roman', serif",
          position: "relative",
        }}
      >
        {/* Eyebrow label */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
            fontFamily: "system-ui, sans-serif",
            fontSize: 18,
            letterSpacing: "0.32em",
            textTransform: "uppercase",
            color: "#C9A84C",
            fontWeight: 500,
          }}
        >
          <span style={{ width: 48, height: 1, backgroundColor: "#C9A84C" }} />
          H&amp;L Conciergerie
          <span style={{ width: 48, height: 1, backgroundColor: "#C9A84C" }} />
        </div>

        {/* Bloc central : logo/monogramme + titre + tagline */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: 28,
            marginTop: 8,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: 22,
              fontSize: 108,
              fontWeight: 300,
              color: "#F8F6F0",
              letterSpacing: "-0.02em",
              lineHeight: 1,
            }}
          >
            <span>Maximisez vos</span>
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 108,
              fontWeight: 300,
              fontStyle: "italic",
              color: "#C9A84C",
              letterSpacing: "-0.02em",
              lineHeight: 1,
            }}
          >
            revenus locatifs.
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 20,
              fontFamily: "system-ui, sans-serif",
              fontSize: 30,
              color: "#A8A8A8",
              fontWeight: 300,
              letterSpacing: "0.01em",
              lineHeight: 1.35,
              maxWidth: 900,
            }}
          >
            Conciergerie haut de gamme à Nice &amp; Côte d&apos;Azur.
          </div>
        </div>

        {/* Pied : domaine + divider or */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            fontFamily: "system-ui, sans-serif",
            fontSize: 20,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "#A8A8A8",
            fontWeight: 500,
          }}
        >
          <div style={{ display: "flex", color: "#C9A84C" }}>
            hlconciergerie.fr
          </div>
          <div style={{ display: "flex", color: "#A8A8A8" }}>
            Nice · Côte d&apos;Azur
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}
