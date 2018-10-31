import {ModuleWithProviders} from '@angular/core';
import {RouterModule} from '@angular/router';
import {LoginFormComponent} from './loginForm/loginForm.component';
import {RegistrationFormComponent} from './registrationForm/registrationForm.component';


export const AccountRouting: ModuleWithProviders = RouterModule.forChild([
  {path: 'account/register', component: RegistrationFormComponent},
  {path: 'account/login', component: LoginFormComponent}
]);
