import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher } from '@angular/material/core';
import { authGuardIsLoggedOut } from './auth/auth.guard';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [authGuardIsLoggedOut]
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [authGuardIsLoggedOut]
  },
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  // providers: [{provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher}]
})
export class AppRoutingModule { }
