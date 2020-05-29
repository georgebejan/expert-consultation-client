import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { I18nError } from '@app/core/http/errors/i18n-error';
import { Tools } from '@app/shared/utils/tools';
import { AuthenticationApiService } from '@app/core/http';
import { LoginRequest } from '@app/core/models';
import { AuthenticationService } from '@app/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginRequest: LoginRequest;
  returnUrl: string;
  wasValidated = false;
  isSubmitted = false;
  generalErrors: I18nError[];

  logInForm = new FormGroup({
    usernameOrEmail: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(private router: Router,
              private route: ActivatedRoute,
              private authenticationApiService: AuthenticationApiService,
              private authService: AuthenticationService) {
    // redirect to home if already logged in
    if (authService.isUserLoggedIn()) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.logInForm.valueChanges.subscribe((request) => {
      this.loginRequest = new LoginRequest();
      this.loginRequest.fromForm(request);
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.logInForm.invalid) {
      return;
    }

    this.authenticationApiService.login(this.loginRequest)
        .subscribe({
          next: login => this.router.navigate([this.returnUrl]),
          error: errors => {
            this.wasValidated = true;
            this.generalErrors = Tools.safeGet(() => errors.error.i18nErrors);
            const i18nFieldErrors: Map<string, I18nError> = Tools.safeGet(() => errors.error.i18nFieldErrors);
            if (!i18nFieldErrors) {
              return;
            }
            Object.keys(i18nFieldErrors).forEach((field: string) => {
              const control: AbstractControl = Tools.safeGet(() => this.logInForm.controls[field]);
              if (!control) {
                return;
              }
              control.markAsTouched();
              control.setErrors({
                [i18nFieldErrors[field].i18nErrorKey]: i18nFieldErrors[field].i18nErrorArguments
              });
            });
          }
        });
  }

  hasErrors(control: AbstractControl) {
    return this.isSubmitted && control.errors;
  }

  isValidClass(control: AbstractControl) {
    if (this.isSubmitted) {
      return control.errors ? 'is-invalid' : 'is-valid';
    }

    return '';
  }
}
