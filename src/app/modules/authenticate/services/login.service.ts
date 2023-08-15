import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, throwError} from 'rxjs';
import {AuthService} from '../../shared-module/Services/auth.service';
import {BaseUrl, LoginApi,} from '../../shared-module/Constnats/app-apis-constants';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {User_Roles} from '../../shared-module/Constnats/app-routes-constants';
import {isAdmin} from '../../shared-module/models/enum';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  url = BaseUrl + LoginApi;
  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private toast: ToastrService,
    private route: Router,
  ) {}

  successToaster(message: string) {
    this.toast.success(message);
  }
  errorToaster(message: string) {
    this.toast.error(message);
  }

  loginFn(data) {
    return this.http
      .post(this.url, data)
      .pipe(catchError((err) => throwError(err)))
      .subscribe({
        next: (data) => {
          let message = 'Login Successful';
          this.auth.setToken(data['token']);
          // to check if the user is an admin
          if(isAdmin(data['permissions'])){
            this.route.navigate([`/admin/${User_Roles}`]);
          }
          this.successToaster(message);
          this.auth.updateData(true)
          this.auth.showLoader(true)
        },
        error: (err) => {
          let message = 'Your Email Not Found';
          this.errorToaster(message);
        },
      });
  }
}
