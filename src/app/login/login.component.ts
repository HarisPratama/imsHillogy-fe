import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { catchError } from 'rxjs';
import { ErrorHandlerService } from '../services/error/error-handler.service';

// export class MyErrorStateMatcher implements ErrorStateMatcher {
//   isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
//     const isSubmitted = form && form.submitted;
//     return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
//   }
// }

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private errorHandler: ErrorHandlerService
  ) {}

  // matcher = new MyErrorStateMatcher();

  formBuilder = this.fb.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required]]
  })

  getField(formName: string) {
    return this.formBuilder.get(formName)
  }

  getErrorMessage(field: string) {
    if (this.getField(field)?.hasError('required')) {
      return 'You must enter a value';
    }

    return this.getField(field)?.hasError('email') ? 'Not a valid email' : '';
  }

  submit() {
    if (this.formBuilder.valid) {
      const payload = {
        email: this.formBuilder.value.email ?? '',
        password: this.formBuilder.value.password ?? ''
      }
      this.authService.login(payload)
        .pipe(
          catchError(this.errorHandler.handleError)
        )
        .subscribe((resp) => {
          if(resp.status == 'Success') {
            localStorage.setItem('accessToken', resp.accessToken)
            localStorage.setItem('role', resp.data.role)
            this.router.navigate(['/dashboard'])
          }
        })
    }
  }
}
