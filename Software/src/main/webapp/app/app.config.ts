import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideOAuthClient } from 'angular-oauth2-oidc';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { getCustomPaginatorIntl } from './custom-paginator-intl';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
    { provide: MatPaginatorIntl, useValue: getCustomPaginatorIntl() },
  provideCharts(withDefaultRegisterables()),
  provideRouter(routes), provideClientHydration(),provideHttpClient(), provideAnimationsAsync(),provideOAuthClient(), provideAnimationsAsync()]
};

