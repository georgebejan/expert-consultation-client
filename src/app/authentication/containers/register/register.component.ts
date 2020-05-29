import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';
import { UserRequest } from '@app/core/models';
import { AuthenticationApiService } from '@app/core/http';
import { Tools } from '@app/shared/utils/tools';
import { I18nError } from '@app/core/http/errors/i18n-error';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  aUser: UserRequest;
  isSubmitted = false;
  wasValidated = false;
  generalErrors: I18nError[];

  signUpForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(private router: Router,
              private route: ActivatedRoute,
              private authenticationApiService: AuthenticationApiService) {
  }

  ngOnInit() {
    this.signUpForm.valueChanges.subscribe((aValue) => {
      this.aUser = new UserRequest();
      this.aUser.fromForm(aValue);
    });
    this.signUpForm.controls.email.setValue(Tools.safeGet(() => this.route.snapshot.params.email));
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.signUpForm.invalid) {
      return;
    }

    const aSignUp = this.aUser;
    this.authenticationApiService.signup(aSignUp)
        .subscribe({
          next: signup => this.router.navigate(['login']),
          error: errors => {
            this.wasValidated = true;
            this.generalErrors = Tools.safeGet(() => errors.error.i18nErrors);
            const i18nFieldErrors: Map<string, I18nError> = Tools.safeGet(() => errors.error.i18nFieldErrors);
            if (!i18nFieldErrors) {
              return;
            }
            Object.keys(i18nFieldErrors).forEach((field: string) => {
              const control: AbstractControl = Tools.safeGet(() => this.signUpForm.controls[field]);
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
