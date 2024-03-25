import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const accessToken = localStorage.getItem('accessToken')
  if(accessToken) return true;

  return false
};

export const authGuardIsLoggedOut: CanActivateFn = (route, state) => {
  const accessToken = localStorage.getItem('accessToken')
  if(accessToken) return false;

  return true
};
