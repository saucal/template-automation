// Contact page + Gravity Forms — GI "Basic WooCommerce tests" 09 + 10.
// Was dropped entirely in the first migration. Covers: the form renders,
// empty-submit validation flags the required fields, every field accepts input,
// and the file upload is accepted.
//
// LIMITATION: the form is gated by an INVISIBLE reCAPTCHA (confirmed live — a
// reCAPTCHA iframe is present, no visible checkbox). Headless automation can't
// satisfy it, so the final success confirmation can't be asserted (same
// limitation as the register form / RM-AC-01). If a test sitekey/allowlist is
// added for staging, re-add the submit→confirmation step (GI 10 steps 20-21).
//
// NOTE: the #input_2_* / #field_2_* IDs are Gravity Forms *form 2* field IDs,
// verified live 2026-07-10. If the form is rebuilt/renumbered these shift.
import { test, expect } from '../../fixtures';
import { dismissOverlays, emailForTest } from '../../helpers/repurposed';

// 1×1 transparent PNG — enough for Gravity Forms' async upload to accept + show
// the remove (trash) control. Avoids shipping a binary fixture in the repo.
const PNG_1PX = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
  'base64'
);

test.describe('Contact', () => {
  test('RM-CONTACT-01 — contact form validation + input', async ({ shopperPage }) => {
    await shopperPage.goto('/contact/');
    await shopperPage.waitForLoadState('load');
    await dismissOverlays(shopperPage);

    const form = shopperPage.locator('#gform_2, form[id*="gform_2"]').first();
    await form.waitFor({ state: 'visible', timeout: 15_000 });

    // --- Empty submit → validation (GI 10 steps 1-7) ---------------------------
    // Overlays (Mailchimp popup, chat widget) re-appear over time and intercept the
    // submit button — clear them again immediately before submitting.
    await dismissOverlays(shopperPage);
    await shopperPage.locator('#gform_submit_button_2').click();
    await expect(
      shopperPage.locator('h2.gform_submission_error, .gform_submission_error').first(),
      'submitting empty should show the form error summary'
    ).toBeVisible({ timeout: 15_000 });
    await expect(
      shopperPage.locator('.validation_message', { hasText: /required/i }).first(),
      'required-field messages should appear'
    ).toBeVisible();

    // --- File upload FIRST (GI 10 steps 18-19) ---------------------------------
    // GF processes the upload via AJAX and re-renders the form, which clears other
    // fields — so upload before filling the text fields, not after.
    await shopperPage.locator('#field_2_19 input[type="file"]').setInputFiles({
      name: 'contact-upload.png',
      mimeType: 'image/png',
      buffer: PNG_1PX,
    });
    await expect(
      shopperPage.locator('.dashicons.dashicons-trash, #field_2_19 .gform_delete, #field_2_19 button').first(),
      'uploaded file should show a remove control'
    ).toBeVisible({ timeout: 20_000 });

    // --- Fill every field (GI 10 steps 8-17) -----------------------------------
    await shopperPage.locator('#input_2_14_3').fill('QA');          // name — first
    await shopperPage.locator('#input_2_14_6').fill('Test');        // name — last
    await shopperPage.locator('#input_2_16').fill('3057658763');    // phone
    await shopperPage.locator('#input_2_12').fill(emailForTest('contact')); // email
    await shopperPage.locator('select#input_2_8').selectOption('Google Search');
    await shopperPage.locator('#choice_2_7_1').click({ force: true }); // radio (GF onchange-driven; click, don't check)
    await shopperPage.locator('#input_2_18').fill('33216');         // zip
    await shopperPage.locator('#input_2_10').fill('Test');
    await shopperPage.locator('#input_2_11').fill('Testing message');

    // Sanity: the fields hold what we typed (form accepts input; no re-render wipe).
    await expect(shopperPage.locator('#input_2_14_3'), 'first name should retain its value').toHaveValue('QA');
    await expect(shopperPage.locator('#input_2_11'), 'message should retain its value').toHaveValue('Testing message');
    // Final submit → confirmation is intentionally NOT asserted: invisible reCAPTCHA
    // blocks headless submission (see file header).
  });
});
