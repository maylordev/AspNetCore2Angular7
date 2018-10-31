import {BrowserModule, DomSanitizer} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';

import {AppRouting} from './app.routing';

import {AppComponent} from './app.component';
import {PageNotFoundComponent} from './components/error/page-not-found/page-not-found.component';
import {CoreModule} from './core/core.module';
import {SharedModule} from './shared/shared.module';
import {MatIconRegistry, MatIconModule} from '@angular/material';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {AccountModule} from './features/account/account.module';
import {TimeTrackerModule} from './features/timeTracker/timeTracker.module';
import {DashboardModule} from './features/dashboard/dashboard.module';
import {HomeComponent} from './components/home/home.component';
import {UserService} from './shared/services/user.service';
import {BearerInterceptService} from './services/bearerIntercept.service';
import {OverlayContainer} from '@angular/cdk/overlay';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatIconModule,
    CoreModule,
    SharedModule,
    AppRouting,
    AccountModule,
    DashboardModule,
    TimeTrackerModule
  ],
  exports: [],
  declarations: [AppComponent, HomeComponent, PageNotFoundComponent],
  providers: [
    BearerInterceptService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: BearerInterceptService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    matIconRegistry: MatIconRegistry,
    domSanitizer: DomSanitizer,
    overlayContainer: OverlayContainer
  ) {
    // overlayContainer.getContainerElement().classList.add('bovsi-theme');
    matIconRegistry.addSvgIconSet(
      // ? https://materialdesignicons.com/
      domSanitizer.bypassSecurityTrustResourceUrl('./src/assets/mdi.svg')
    );
  }
}
