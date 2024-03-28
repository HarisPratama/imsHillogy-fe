import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';
import { ErrorHandlerService } from '../services/error/error-handler.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private errorHandler: ErrorHandlerService,
    private _snackBar: MatSnackBar
  ) {}

  // matcher = new MyErrorStateMatcher();

  formBuilder = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    username: ['', [Validators.required]],
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
        username: this.formBuilder.value.username ?? '',
        password: this.formBuilder.value.password ?? ''
      }
      this.authService.register(payload)
        .pipe(
          catchError(this.errorHandler.handleError)
        )
        .subscribe(
          {
            next:(resp) => {
              if(resp.status == 'Success') {
                this.router.navigate(['/login'])
              } else {
                this._snackBar.open(resp.message ?? '', resp.status ?? '')
                throw { message: resp.message, error: resp.status }
              }
            },
            error: (err) => {
              this._snackBar.open(err.message, err.error)
            },
          }
        )
    }
  }
}
