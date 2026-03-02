import { expect, type Page } from '@playwright/test';

export class MoroCareerPage {
  private readonly page: Page;
  private readonly locators: {
    careerHeroText: ReturnType<Page['locator']>;
    positionsSection: ReturnType<Page['locator']>;
    cityFilterToggle: ReturnType<Page['locator']>;
    cityFilterSelectedValue: ReturnType<Page['locator']>;
    allPositionItems: ReturnType<Page['locator']>;
    cookieAcceptButton: ReturnType<Page['locator']>;
  };

  constructor(page: Page) {
    this.page = page;
    this.locators = {
      careerHeroText: this.page.getByText(/s\s*tebou\s*budeme\s*lepší/i).first(),
      positionsSection: this.page.locator('#pozice'),
      cityFilterToggle: this.page.locator('#pozice .inp-custom-select__select').first(),
      cityFilterSelectedValue: this.page.locator('#pozice .inp-custom-select__select-wrap').first(),
      allPositionItems: this.page.locator('#pozice .js-filter__item'),
      cookieAcceptButton: this.page.locator('button:has-text("Přijmout"), button:has-text("Souhlasím"), button:has-text("Akceptovat")').first()
    };
  }

  private cityFilterOption(city: string) {
    return this.page.locator(`#pozice .inp-custom-select__item.js-filter__link[data-filter="${city}"]`).first();
  }

  private cityFilterPattern(city: string): RegExp {
    const escapedCity = city.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return new RegExp(`(^|,\\s*)${escapedCity}(\\s*,|$)`, 'i');
  }

  async expectCareerPageVisible(): Promise<void> {
    await expect(this.locators.careerHeroText).toBeVisible();
    await expect(this.locators.positionsSection).toBeVisible();
  }

  async acceptCookiesIfVisible(): Promise<void> {
    const isCookieAcceptVisible = await this.locators.cookieAcceptButton.isVisible().catch(() => false);
    if (isCookieAcceptVisible) {
      await this.locators.cookieAcceptButton.click();
    }
  }

  async goToCareerPage(baseDomain: string, careerPath: string): Promise<void> {
    await this.page.goto(`${baseDomain}${careerPath}`, { waitUntil: 'domcontentloaded' });
    await this.acceptCookiesIfVisible();
    await this.expectCareerPageVisible();
  }

  async filterByCity(city: string): Promise<void> {
    await expect(this.locators.cityFilterToggle).toBeVisible();
    await this.locators.cityFilterToggle.click();
    await expect(this.cityFilterOption(city)).toBeVisible();
    await this.cityFilterOption(city).click();
    await expect(this.locators.cityFilterSelectedValue).toContainText(new RegExp(city, 'i'));
  }

  async expectFilteredResultsContainCity(city: string): Promise<void> {
    await expect
      .poll(
        async () => {
          return await this.locators.allPositionItems.evaluateAll((items) => {
            return items.filter((item) => !item.classList.contains('is-hidden')).length;
          });
        },
        {
          timeout: 15_000
        }
      )
      .toBeGreaterThan(0);

    const visibleFilters = await this.locators.allPositionItems.evaluateAll((items) => {
      return items
        .filter((item) => !item.classList.contains('is-hidden'))
        .map((item) => item.getAttribute('data-filter') ?? '');
    });

    expect(visibleFilters.length).toBeGreaterThan(0);

    const cityPattern = this.cityFilterPattern(city);

    for (const filterValue of visibleFilters) {
      expect(filterValue).toMatch(cityPattern);
    }
  }

  async expectNoPositionsForSelectedCity(): Promise<void> {
    const counts = await this.locators.allPositionItems.evaluateAll((items) => {
      const activeCount = items.filter((item) => !item.classList.contains('is-hidden')).length;
      const hiddenCount = items.filter((item) => item.classList.contains('is-hidden')).length;
      return { activeCount, hiddenCount };
    });

    expect(counts.activeCount).toBe(0);
    expect(counts.hiddenCount).toBeGreaterThan(0);
  }
}