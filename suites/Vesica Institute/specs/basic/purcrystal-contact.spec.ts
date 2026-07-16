// Pur Crystal contact-form submit (GI guest test 08 "Submited Contact page").
// Functional: fill the Elementor contact form on /contact/ and confirm the success
// message. Thin — helper + assert, no inline expect().
import { test } from '../../fixtures';
import { submitContactForm, dismissCookieBanner } from '../../helpers/purcrystal';
import { assertContactFormSubmitted } from '../../helpers/assertions';

test.describe(
  'Pur Crystal contact',
  { tag: ['@plugin:woocommerce', '@plugin:elementor'] },
  () => {
    test('PC-CONTACT-01 – contact form submits', async ({ shopperPage }) => {
      await shopperPage.goto('contact/', { waitUntil: 'load' });
      await dismissCookieBanner(shopperPage);
      await submitContactForm(shopperPage);
      await assertContactFormSubmitted(shopperPage);
    });
  }
);
