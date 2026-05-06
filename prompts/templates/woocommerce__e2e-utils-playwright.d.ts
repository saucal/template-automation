// Drop into types/ — package ships JS only, tsc errors with TS7016 without this.
declare module '@woocommerce/e2e-utils-playwright' {
  import type { Page } from '@playwright/test';

  export function fillShippingCheckoutBlocks(page: Page, details?: CheckoutDetails): Promise<void>;
  export function fillBillingCheckoutBlocks(page: Page, details?: CheckoutDetails): Promise<void>;
  export function addAProductToCart(page: Page, productId: string, quantity?: number): Promise<void>;
  export function addOneOrMoreProductToCart(page: Page, productName: string, quantity?: number): Promise<void>;
  export function getOrderIdFromUrl(page: Page): string | undefined;
  export function createClient(baseURL: string, auth: BasicAuth | OAuth1Auth): ApiClient;

  export const WC_API_PATH: 'wc/v3';
  export const WC_ADMIN_API_PATH: 'wc-admin';
  export const WP_API_PATH: 'wp/v2';

  interface CheckoutDetails {
    country?: string;
    firstName?: string;
    lastName?: string;
    company?: string;
    address?: string;
    zip?: string;
    city?: string;
    state?: string;
    phone?: string;
    isPostalCode?: boolean;
    [key: string]: string | boolean | undefined;
  }

  interface BasicAuth { type: 'basic'; username: string; password: string }
  interface OAuth1Auth { type: 'oauth1'; consumerKey: string; consumerSecret: string }

  interface ApiClient {
    get(path: string, params?: Record<string, unknown>, debug?: boolean): Promise<{ data: any }>;
    post(path: string, data?: Record<string, unknown>, debug?: boolean): Promise<{ data: any }>;
    put(path: string, data?: Record<string, unknown>, debug?: boolean): Promise<{ data: any }>;
    delete(path: string, params?: Record<string, unknown>, debug?: boolean): Promise<{ data: any }>;
  }
}
