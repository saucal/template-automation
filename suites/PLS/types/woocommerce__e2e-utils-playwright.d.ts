// The @woocommerce/e2e-utils-playwright package ships no type declarations.
// Declare only what this suite uses (the blocks address-fill helper). Mirrors
// the payoneer-v4-automation declaration.
declare module '@woocommerce/e2e-utils-playwright' {
  import type { Page } from '@playwright/test';

  export function fillShippingCheckoutBlocks(page: Page, details?: CheckoutDetails): Promise<void>;
  export function fillBillingCheckoutBlocks(page: Page, details?: CheckoutDetails): Promise<void>;

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
}
