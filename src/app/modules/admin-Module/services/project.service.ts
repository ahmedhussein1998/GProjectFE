import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {editProject, IResponse, singleProjectDataDto} from '../../shared-module/models/interfaces';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  baseUrl = 'https://localhost:7264';
  constructor(private http:HttpClient) {}

  addProject(data){
    let url = `${this.baseUrl}/projects`;
    return this.http.post(url,data).pipe(catchError((err)=>throwError(err)))
  }

  getAllProjects(): Observable<IResponse>{
    let url = `${this.baseUrl}/projects`;
    return this.http.get<IResponse>(url).pipe(catchError((err)=>throwError(err)));
  }
  getProject(projectId){
    let url = `${this.baseUrl}/project?id=${projectId}`;
    return this.http.get(url).pipe(catchError((err)=>throwError(err)))
  }
  editProject(projectData:editProject){
    let url = `${this.baseUrl}/projects/Update`;
    return this.http.post(url,projectData).pipe(catchError((err)=>throwError(err)))
  }
}
