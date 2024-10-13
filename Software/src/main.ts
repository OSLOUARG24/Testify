import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './main/webapp/app/app.config';
import { AppComponent } from './main/webapp/app/app.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
