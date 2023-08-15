import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  url = 'https://localhost:7264/auth/Login';
  constructor() {}

  setToken(token) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  private isLoggedSubject = new BehaviorSubject<boolean>(false);
  private showLoaderSubject = new BehaviorSubject<boolean>(false);
  private progressSubject = new BehaviorSubject<number>(0)

  get progressSubject$():Observable<number> {
    return this.progressSubject.asObservable();
  }
  get showLoaderSubject$():Observable<boolean> {
    return this.showLoaderSubject.asObservable();
  }
  get isLoggedSubject$(): Observable<boolean> {
    return this.isLoggedSubject.asObservable();
  }
  showLoader(data:boolean):void{
    this.showLoaderSubject.next(data);
  }

  updateData(data:boolean):void{
    this.isLoggedSubject.next(data);
  }
  updateBar(value:number):void{
    this.progressSubject.next(value);
  }

}
