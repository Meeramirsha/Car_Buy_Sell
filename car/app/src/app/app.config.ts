import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withComponentInputBinding, withAnchorScrolling, withScrollPositionRestoration } from '@angular/router';
import { routes } from './app.routes';
import { FormsModule } from '@angular/forms';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './interceptors/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, 
      withComponentInputBinding(),
      withAnchorScrolling(),
      withScrollPositionRestoration('enabled')
    ),
    importProvidersFrom(FormsModule),
    provideHttpClient(withInterceptors([authInterceptor]))
  ]
};
