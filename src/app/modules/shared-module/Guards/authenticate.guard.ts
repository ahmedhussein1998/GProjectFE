import {inject} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivateFn, NavigationEnd, Router, RouterStateSnapshot,} from '@angular/router';
import {AuthService} from '../Services/auth.service';
import {filter} from 'rxjs';

export const authenticateGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const jwt = inject(AuthService);
  const router = inject(Router);
  let currentUrl = '';
  let value = 25;

  if (jwt.getToken()) {
    // to update progressive bar value if user change the roure from the above url without clicking the side bar
    router.events
    .pipe(filter((event) => event instanceof NavigationEnd))
    .subscribe((event: NavigationEnd) => {
      currentUrl = event.url;
      switch (currentUrl.split('/').pop()) {
        case 'userroles':
          value = 1;
          break;
        case 'userprojects':
          value = 2;
          break;
        case 'userobjectives':
          value = 3;
          break;
        case 'members':
          value = 4;
          break;
      }
      jwt.updateBar(value);
    });
    // ///////////////////////////
    if (state.url == '/admin') {
      router.navigate(['admin/userroles']);
    }
    return true;
  }
  jwt.updateBar(0);
  jwt.updateData(false)
  router.navigate(['login']);
  return false;
};
