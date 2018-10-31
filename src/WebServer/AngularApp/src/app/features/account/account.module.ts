import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {LoginFormComponent} from './loginForm/loginForm.component';
import {RegistrationFormComponent} from './registrationForm/registrationForm.component';
import {UserService} from '../../shared/services/user.service';
import {AccountRouting} from './account.routing';
import {SharedModule} from '../../shared/shared.module';
import {EmailValidatorDirective} from '../../directives/emailValidator.directive';

// import { FacebookLoginComponent } from './facebook-login/facebook-login.component';

@NgModule({
  imports: [CommonModule, FormsModule, AccountRouting, SharedModule],
  declarations: [
    RegistrationFormComponent,
    EmailValidatorDirective,
    LoginFormComponent
  ],
  providers: [UserService]
})
export class AccountModule {}
