import {Injectable} from '@angular/core';
import {objectiveName} from '../models/interfaces';
import {HttpClient} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {IResponse} from '../../shared-module/models/interfaces';

@Injectable({
  providedIn: 'root',
})
export class ObjectiveService {
  baseUrl = 'https://localhost:7264';
  constructor(private http:HttpClient) {}

  getObjectives(): Observable<IResponse>{
    let url = this.baseUrl + '/objectives';
    return this.http.get<IResponse>(url).pipe(catchError((err)=>throwError(err)));
  }
  createObjective(objective:objectiveName){
    return this.http.post(`${this.baseUrl}/CreateObjective`,objective).pipe(catchError((err)=>throwError(err)))
  }
  editObjective(data){
   return this.http.put(`${this.baseUrl}/UpdateObjective` , data).pipe(catchError((err)=>throwError(err)))
  }
}
