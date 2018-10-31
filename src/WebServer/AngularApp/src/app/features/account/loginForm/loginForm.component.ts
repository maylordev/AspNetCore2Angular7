import {Subscription} from 'rxjs';
import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {Credentials} from '../../../shared/models/credentials.interface';
import {UserService} from '../../../shared/services/user.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './loginForm.component.html',
  styleUrls: ['./loginForm.component.scss']
})
export class LoginFormComponent implements OnInit, OnDestroy {
  private subscription: Subscription;

  brandNew: boolean;
  errors: string;
  isRequesting: boolean;
  submitted: boolean = false;
  credentials: Credentials = {username: '', password: ''};

  constructor(
    private userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    // subscribe to router event
    this.subscription = this.activatedRoute.queryParams.subscribe(
      (param: any) => {
        this.brandNew = param['brandNew'];
        this.credentials.username = param['username'];
      }
    );
  }

  ngOnDestroy() {
    // prevent memory leak by unsubscribing
    this.subscription.unsubscribe();
  }

  login({value, valid}: {value: Credentials; valid: boolean}) {
    this.submitted = true;
    this.isRequesting = true;
    this.errors = '';
    if (valid) {
      this.userService.login(value.username, value.password).subscribe(
        result => {
          if (result) {
            this.router.navigate(['/dashboard']);
          }
        },
        error => (this.errors = error),
        () => (this.isRequesting = false)
      );
    }
  }
}
