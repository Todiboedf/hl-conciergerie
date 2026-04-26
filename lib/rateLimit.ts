/**
 * Rate-limiter en mémoire (best-effort, non persistant entre cold starts
 * Vercel). Réutilisable depuis n'importe quelle route API. Pour un cas
 * production-grade multi-instance, brancher Redis / Vercel KV.
 */

type Bucket = {
  hits: number;
  resetAt: number;
};

const buckets = new Map<string, Bucket>();

export function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  const realIp = request.headers.get("x-real-ip");
  if (realIp) return realIp;
  return "unknown";
}

/**
 * Vérifie si la clé `key` a dépassé `maxHits` requêtes dans la fenêtre
 * `windowMs`. Retourne `true` si la requête doit être bloquée.
 */
export function isRateLimited(
  key: string,
  options: { windowMs: number; maxHits: number },
): boolean {
  const now = Date.now();
  const bucket = buckets.get(key);

  if (!bucket || bucket.resetAt < now) {
    buckets.set(key, { hits: 1, resetAt: now + options.windowMs });
    cleanup(now);
    return false;
  }

  if (bucket.hits >= options.maxHits) {
    return true;
  }

  bucket.hits += 1;
  return false;
}

/**
 * Vérifie qu'une requête vient bien de notre origine (anti-CSRF léger
 * pour les endpoints "écriture" appelés par le front). On accepte les
 * requêtes sans Origin/Referer (curl légitime, certains user-agents),
 * mais on refuse celles qui pointent vers un autre domaine.
 */
export function isAllowedOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  const referer = request.headers.get("referer");

  // Liste blanche d'hôtes acceptables.
  const allowed = [
    "hl-conciergerie.com",
    "www.hl-conciergerie.com",
    "localhost",
    "127.0.0.1",
  ];

  // Accepter aussi les previews Vercel `*.vercel.app` du projet.
  const allowedSuffix = ".vercel.app";

  const candidate = origin ?? referer;
  if (!candidate) return true; // pas d'info → on laisse passer

  try {
    const host = new URL(candidate).hostname;
    if (allowed.includes(host)) return true;
    if (host.endsWith(allowedSuffix)) return true;
    return false;
  } catch {
    return false;
  }
}

function cleanup(now: number): void {
  if (buckets.size <= 1000) return;
  for (const [key, bucket] of buckets) {
    if (bucket.resetAt < now) {
      buckets.delete(key);
    }
  }
}
