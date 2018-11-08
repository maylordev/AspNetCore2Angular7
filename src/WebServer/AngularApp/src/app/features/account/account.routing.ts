import {ModuleWithProviders, NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginFormComponent} from './loginForm/loginForm.component';
import {RegistrationFormComponent} from './registrationForm/registrationForm.component';

const accountRoutes: Routes = [
  {path: 'account/register', component: RegistrationFormComponent},
  {path: 'account/login', component: LoginFormComponent}
];

@NgModule({
  imports: [RouterModule.forChild(accountRoutes)],
  exports: [RouterModule]
})
export class AccountRoutingModule {}
