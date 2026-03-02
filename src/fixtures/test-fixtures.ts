import { test as base } from '@playwright/test';
import uiDataJson from '../data/ui-data.json';
import apiDataJson from '../data/api-data.json';
import { MoroCareerPage } from '../page-objects/moro-career.page';
import type { ApiTestData, UiTestData } from '../types/test-data';

type CustomFixtures = {
  moroCareerPage: MoroCareerPage;
  uiData: UiTestData;
  apiData: ApiTestData;
};

export const test = base.extend<CustomFixtures>({
  moroCareerPage: async ({ page }, use) => {
    await use(new MoroCareerPage(page));
  },
  uiData: async ({}, use) => {
    await use(uiDataJson as UiTestData);
  },
  apiData: async ({}, use) => {
    await use(apiDataJson as ApiTestData);
  }
});

export const expect = test.expect;