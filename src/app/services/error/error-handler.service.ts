import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(private _snackBar: MatSnackBar) { }

  handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      this._snackBar.open(error.message, error.error)
    } else {
      this._snackBar.open(error.message, error.error)
    }
    console.log('error');
    
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
