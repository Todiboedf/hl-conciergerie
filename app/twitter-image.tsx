/**
 * Twitter card image — délègue au même rendu que l'OG image.
 * Next.js 15 exige que `runtime`, `size`, `alt` etc. soient déclarés
 * statiquement dans CE fichier (pas ré-exportés), pour être parsés
 * à la compilation. Le composant est délégué à `OpenGraphImage`
 * pour garder une seule source de vérité visuelle.
 */

import OpenGraphImage from "./opengraph-image";

export const runtime = "edge";

export const alt = "H&L Conciergerie · Gestion locative premium à Nice";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function TwitterImage() {
  return OpenGraphImage();
}
