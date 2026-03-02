import { test, expect } from '../../src/fixtures/test-fixtures';

test.describe('GUI: MoroSystems Kariéra', () => {
  test('Verify city filtering flow', async ({ page, moroCareerPage, uiData }) => {
    const moroDomain = process.env.MORO_DOMAIN ?? 'https://www.morosystems.cz';

    await test.step('Navigate to Kariéra page', async () => {
      await moroCareerPage.goToCareerPage(moroDomain, uiData.careerPagePath);
      await expect(page).toHaveURL(/\/kariera\/?/i);
    });

    for (const cityVariant of uiData.cityFilterVariants) {
      await test.step(`Filter positions by location: ${cityVariant.city}`, async () => {
        await moroCareerPage.filterByCity(cityVariant.city);

        if (cityVariant.hasPositions) {
          await moroCareerPage.expectFilteredResultsContainCity(cityVariant.city);
          return;
        }

        await moroCareerPage.expectNoPositionsForSelectedCity();
      });
    }
  });
});