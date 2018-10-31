import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UserRegistration} from '../../../shared/models/userRegistration.interface';
import {UserService} from '../../../shared/services/user.service';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registrationForm.component.html',
  styleUrls: ['./registrationForm.component.scss']
})
export class RegistrationFormComponent implements OnInit {
  errors: string;
  isRequesting: boolean;
  submitted = false;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {}

  registerUser({value, valid}: {value: UserRegistration; valid: boolean}) {
    this.submitted = true;
    this.isRequesting = true;
    this.errors = '';
    if (valid) {
      this.userService
        .register(
          value.email,
          value.password,
          value.firstName,
          value.lastName,
          value.location
        )
        .subscribe(
          result => {
            if (result) {
              this.router.navigate(['/login'], {
                queryParams: {brandNew: true, email: value.email}
              });
            }
          },
          errors => (this.errors = errors),
          () => (this.isRequesting = false)
        );
    }
  }
}
