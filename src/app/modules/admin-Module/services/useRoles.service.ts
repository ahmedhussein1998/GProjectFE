import {Injectable} from '@angular/core';
import {objectiveName} from '../models/interfaces';
import {HttpClient} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {IResponse} from '../../shared-module/models/interfaces';

@Injectable({
  providedIn: 'root',
})
export class UseRolesService {
  baseUrl = 'https://localhost:7264';
  constructor(private http:HttpClient) {}

  getRoles(): Observable<IResponse>{
    let url = this.baseUrl + '/Roles/ListAllRoles';
    return this.http.get<IResponse>(url).pipe(catchError((err)=>throwError(err)));
  }
 createMember(data){
   let url = this.baseUrl + '/auth/Register';
    return this.http.post(url ,data).pipe(catchError((err)=>throwError(err)));
 }
}
