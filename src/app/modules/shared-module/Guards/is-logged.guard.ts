import {ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from '../Services/auth.service';
import {inject} from '@angular/core';

export const isLoggedGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const jwt = inject(AuthService);
  const router = inject(Router);
  if(jwt.getToken()){
    jwt.updateData(true);
    router.navigate(['admin/userroles'])
    return false;
  }
  return true;
};

