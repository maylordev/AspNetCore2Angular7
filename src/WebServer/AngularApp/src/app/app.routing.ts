import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {PageNotFoundComponent} from './components/error/page-not-found/page-not-found.component';
import {HomeComponent} from './components/home/home.component';

/***************************************************************
 * Lazy Loading to Eager Loading
 *
 * 1. Remove the module and NgModule imports in `app.module.ts`
 *
 * 2. Remove the lazy load route from `app.routing.ts`
 *
 * 3. Change the module's default route path from '' to 'pathname'
 *****************************************************************/
const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: '**',
    pathMatch: 'full',
    component: PageNotFoundComponent
  }
];

export const AppRouting: ModuleWithProviders = RouterModule.forRoot(appRoutes);
