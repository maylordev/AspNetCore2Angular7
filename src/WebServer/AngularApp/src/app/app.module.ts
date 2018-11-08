import {BrowserModule, DomSanitizer} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app.routing';

import {AppComponent} from './app.component';
import {PageNotFoundComponent} from './components/error/page-not-found/page-not-found.component';
import {CoreModule} from './core/core.module';
import {SharedModule} from './shared/shared.module';
import {
  MatIconRegistry,
  MatIconModule,
  DateAdapter,
  MAT_DATE_LOCALE,
  MAT_DATE_FORMATS
} from '@angular/material';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {AccountModule} from './features/account/account.module';
import {TimeTrackerModule} from './features/timeTracker/timeTracker.module';
import {DashboardModule} from './features/dashboard/dashboard.module';
import {HomeComponent} from './components/home/home.component';
import {OverlayContainer} from '@angular/cdk/overlay';
import {EmployerModule} from './features/employer/employer.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BearerInterceptService} from './services/bearer.interceptor';
import {RefreshTokenInterceptor} from './services/refreshToken.interceptor';
import {
  MatMomentDateModule,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
  MomentDateAdapter,
  MAT_MOMENT_DATE_FORMATS
} from '@angular/material-moment-adapter';

export const CUSTOM_DATEPICKER_FORMATS = {
  parse: {
    dateInput: 'LL'
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  }
};

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatMomentDateModule,
    ReactiveFormsModule,
    MatIconModule,
    CoreModule,
    FormsModule,
    SharedModule,
    AccountModule,
    DashboardModule,
    TimeTrackerModule,
    EmployerModule,
    AppRoutingModule
  ],
  exports: [],
  declarations: [AppComponent, HomeComponent, PageNotFoundComponent],
  providers: [
    {provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: {useUtc: true}},
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE]
    },
    {provide: MAT_DATE_FORMATS, useValue: CUSTOM_DATEPICKER_FORMATS},
    BearerInterceptService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: BearerInterceptService,
      multi: true
    },
    RefreshTokenInterceptor,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RefreshTokenInterceptor,
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
