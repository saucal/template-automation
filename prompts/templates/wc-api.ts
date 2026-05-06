// Template for helpers/wc-api.ts — REST clients via @woocommerce/e2e-utils-playwright.
//
// Key gotchas (see prompt rule 8):
//  - createClient throws at construction if username/password empty → lazy factory.
//  - createClient appends 'wp-json/' itself; pass paths as 'wc/v3/...' / 'wp/v2/...'.
//  - Responses are axios-shaped: { data, status, ... } — caller unwraps `.data`.
//  - Query params go as object: client.get(path, { status: 'failed' }).
//  - Only get/post/put/delete on the returned client (no patch).
import dotenv from 'dotenv';
import path from 'path';
import { createClient, WC_API_PATH, WP_API_PATH } from '@woocommerce/e2e-utils-playwright';

dotenv.config({ path: path.join(__dirname, '..', '.env') });

const baseUrl = (process.env.BASE_URL ?? '').replace(/\/$/, '');

type RestClient = ReturnType<typeof createClient>;

async function withRetry<T>(fn: () => Promise<T>, retries = 3, delayMs = 1000): Promise<T> {
  let lastErr: unknown;
  for (let attempt = 1; attempt <= retries; attempt++) {
    try { return await fn(); } catch (err) {
      lastErr = err;
      const e = err as NodeJS.ErrnoException & { message?: string };
      const transient =
        e?.code === 'ECONNRESET' ||
        e?.code === 'ETIMEDOUT' ||
        e?.code === 'ECONNREFUSED' ||
        (typeof e?.message === 'string' && /socket hang up|fetch failed/i.test(e.message));
      if (transient && attempt < retries) {
        await new Promise((r) => setTimeout(r, delayMs * attempt));
        continue;
      }
      throw err;
    }
  }
  throw lastErr;
}

function withRetryProxy(client: RestClient): RestClient {
  return new Proxy(client, {
    get(target, prop) {
      const val = (target as any)[prop];
      if (typeof val === 'function' && ['get', 'post', 'put', 'delete'].includes(prop as string)) {
        return (...args: any[]) => withRetry(() => val.apply(target, args));
      }
      return val;
    },
  }) as RestClient;
}

let _wpClient: RestClient | null = null;
let _wcClient: RestClient | null = null;

function wpClient(): RestClient {
  if (!_wpClient) {
    _wpClient = withRetryProxy(createClient(baseUrl, {
      type: 'basic',
      username: process.env.WP_ADMIN_USER ?? '',
      password: process.env.WP_API_PASS ?? '',
    }));
  }
  return _wpClient;
}

function wcClient(): RestClient {
  if (!_wcClient) {
    _wcClient = withRetryProxy(createClient(baseUrl, {
      // Use 'oauth1' if you have consumer key/secret; 'basic' works with WC's
      // built-in REST keys when sent as username/password over HTTPS.
      type: 'basic',
      username: process.env.WOO_USER ?? '',
      password: process.env.WOO_PASS ?? '',
    }));
  }
  return _wcClient;
}

// Example fetchers — adapt to project. Always read response via `.data`.
export async function getSuiteVars() {
  const { data } = await wpClient().get(`${WP_API_PATH}/settings`);
  const title = data.title as string;
  return { title, blog: title.toLowerCase().replace(/\s/g, '_') };
}

export async function getWooOrder(orderNumber: string | number) {
  const { data } = await wcClient().get(`${WC_API_PATH}/orders/${orderNumber}`);
  return data;
}

export async function getFailedOrders() {
  const { data } = await wcClient().get(`${WC_API_PATH}/orders`, { status: 'failed', per_page: 10 });
  return data;
}
