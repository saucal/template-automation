// Contact page + Gravity Forms submission — GI "Basic WooCommerce tests" 09 + 10.
// Was dropped entirely in the first migration. Covers: empty-submit validation,
// filling every field (incl. a file upload), and the success confirmation.
//
// NOTE: the #input_2_* / #field_2_* IDs are Gravity Forms *form 2* field IDs,
// taken verbatim from the GI export (10_-_Submit_Contact_page). If the form is
// rebuilt/renumbered these shift — verify against the live form on first run.
import { test, expect } from '../../fixtures';
import { dismissOverlays, emailForTest } from '../../helpers/repurposed';

// 1×1 transparent PNG — enough for Gravity Forms' async upload to accept + show
// the remove (trash) control. Avoids shipping a binary fixture in the repo.
const PNG_1PX = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
  'base64'
);

test.describe('Contact', () => {
  test('RM-CONTACT-01 — submit the contact form', async ({ shopperPage }) => {
    await shopperPage.goto('/contact/');
    await shopperPage.waitForLoadState('load');
    await dismissOverlays(shopperPage);

    const form = shopperPage.locator('#gform_2, form[id*="gform_2"]').first();
    await form.waitFor({ state: 'visible', timeout: 15_000 });

    // --- Empty submit → validation (GI 10 steps 1-7) ---------------------------
    await shopperPage.locator('#gform_submit_button_2').click();
    await expect(
      shopperPage.locator('h2.gform_submission_error, .gform_submission_error').first(),
      'submitting empty should show the form error summary'
    ).toBeVisible({ timeout: 15_000 });
    await expect(
      shopperPage.locator('.validation_message', { hasText: /required/i }).first(),
      'required-field messages should appear'
    ).toBeVisible();

    // --- Fill every field (GI 10 steps 8-18) -----------------------------------
    await shopperPage.locator('#input_2_14_3').fill('QA');          // name — first
    await shopperPage.locator('#input_2_14_6').fill('Test');        // name — last
    await shopperPage.locator('#input_2_16').fill('3057658763');    // phone
    await shopperPage.locator('#input_2_12').fill(emailForTest('contact')); // email
    await shopperPage.locator('select#input_2_8').selectOption({ label: 'Website' }).catch(async () => {
      await shopperPage.locator('select#input_2_8').selectOption('Website');
    });
    await shopperPage.locator('#choice_2_7_1').check({ force: true }); // radio
    await shopperPage.locator('#input_2_18').fill('33216');         // zip
    await shopperPage.locator('#input_2_10').fill('Test');
    await shopperPage.locator('#input_2_11').fill('Testing message');

    // File upload — GF uploads asynchronously, then shows a trash/remove control.
    await shopperPage.locator('#field_2_19 input[type="file"]').setInputFiles({
      name: 'contact-upload.png',
      mimeType: 'image/png',
      buffer: PNG_1PX,
    });
    await expect(
      shopperPage.locator('.dashicons.dashicons-trash, #field_2_19 .gform_delete, #field_2_19 button').first(),
      'uploaded file should show a remove control'
    ).toBeVisible({ timeout: 20_000 });

    // --- Submit → confirmation (GI 10 steps 20-21) -----------------------------
    await shopperPage.locator('#gform_submit_button_2').click();
    const confirmation = shopperPage.locator('#gform_confirmation_message_2, .gform_confirmation_message').first();
    await expect(confirmation, 'a confirmation message should appear after submit').toBeVisible({ timeout: 20_000 });
    await expect(confirmation, 'confirmation should thank the sender').toContainText(/thank|get in touch|shortly/i);
  });
});
