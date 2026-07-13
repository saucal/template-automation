// Vesica contact-form submit (GI guest test 08). Functional: fill the Elementor
// contact form on /contact-us/ and confirm the success message. Thin — helper +
// assert, no inline expect().
import { test } from '../../fixtures';
import { submitContactForm, dismissCookieBanner } from '../../helpers/vesica';
import { assertContactFormSubmitted } from '../../helpers/assertions';

test.describe(
  'Vesica contact',
  { tag: ['@plugin:woocommerce', '@plugin:elementor'] },
  () => {
    test('VES-CONTACT-01 – contact form submits', async ({ shopperPage }) => {
      await shopperPage.goto('contact-us/', { waitUntil: 'load' });
      await dismissCookieBanner(shopperPage);
      await submitContactForm(shopperPage);
      await assertContactFormSubmitted(shopperPage);
    });
  }
);
