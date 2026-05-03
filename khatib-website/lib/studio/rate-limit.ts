// Per-instance IP rate limiter. Honest about its limit: only one Fluid Compute instance
// sees a given submitter. Sufficient as a first line; upgrade to Vercel KV when traffic
// justifies cross-instance accounting.

interface Bucket {
  windowMs: number;
  max: number;
}

const stores = new Map<string, Map<string, number[]>>();

export function rateLimited(bucket: string, ip: string, opts: Bucket): boolean {
  let store = stores.get(bucket);
  if (!store) {
    store = new Map();
    stores.set(bucket, store);
  }
  const now = Date.now();
  const cutoff = now - opts.windowMs;
  const recent = (store.get(ip) ?? []).filter((t) => t > cutoff);
  if (recent.length >= opts.max) {
    store.set(ip, recent);
    return true;
  }
  recent.push(now);
  store.set(ip, recent);
  // Opportunistic cleanup so the map doesn't grow unbounded.
  if (store.size > 1000) {
    for (const [k, v] of store) {
      const kept = v.filter((t) => t > cutoff);
      if (kept.length === 0) store.delete(k);
      else store.set(k, kept);
    }
  }
  return false;
}

export function clientIp(req: Request): string {
  const xff = req.headers.get('x-forwarded-for');
  if (xff) return xff.split(',')[0]?.trim() || 'unknown';
  return req.headers.get('x-real-ip') ?? 'unknown';
}
