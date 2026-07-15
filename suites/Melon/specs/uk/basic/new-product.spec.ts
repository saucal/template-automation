// UK redesigned product page (GI "New Product page Redesigned"). Selecting a
// pre-made combination must update the product gallery to images matching that
// combination's attributes. Asserts the behaviour (each attribute slug appears in
// a gallery image), not a pinned image id (rule 35).
import { test } from '../../../fixtures';
import { REGIONS, PRODUCTS, openProduct, selectPremadeCombination } from '../../../helpers/melon';
import { assertGalleryMatchesCombination } from '../../../helpers/assertions';

test.describe('UK — redesigned product page', { tag: ['@plugin:woocommerce', '@plugin:woocommerce-composite-products'] }, () => {
  test('MO-UK-PROD-02 – pre-made combination updates the gallery', async ({ shopperPage }) => {
    await openProduct(shopperPage, REGIONS.uk, PRODUCTS.jester);
    const { params, srcs } = await selectPremadeCombination(shopperPage);
    assertGalleryMatchesCombination(params, srcs);
  });
});
