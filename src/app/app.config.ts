import { registerLocaleData } from '@angular/common';
import localeCs from '@angular/common/locales/cs';
import { ApplicationConfig, ErrorHandler, importProvidersFrom } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TitleStrategy, provideRouter, withViewTransitions } from '@angular/router';
import { provideAppVersion } from 'ngx-app-version';
import { provideFixedFooter } from 'ngx-fixed-footer';
import { provideTranslateVersion } from 'ngx-translate-version';
import { VERSION } from '../environments/version';
import { routes } from './app.routes';
import { CustomErrorHandlerService } from './shared/services/custom-error-handler.service';
import { }

// import the routes
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
   providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideAnimationsAsync()],
};
