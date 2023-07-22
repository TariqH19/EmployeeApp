import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {
  Observable
} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
readonly APIUrl = "http://127.0.0.1:8000"
readonly PhotoUrl = "http://127.0.0.1:8000/media/"

  constructor(private http: HttpClient) { }
  
  getDeptList(): Observable<any[]>{
    return this.http.get<any[]>(this.APIUrl + '/department');
  }

  addDepartment(val:any){
    return this.http.post<any[]>(this.APIUrl + '/department/', val);
  }

  updateDepartment(val:any){
    return this.http.put<any[]>(this.APIUrl + '/department/', val);
  }

  deleteDepartment(val:any){
    return this.http.delete<any[]>(this.APIUrl + '/department/'+ val);
  }

  getEmpList(): Observable<any[]>{
    return this.http.get<any[]>(this.APIUrl + '/employees');
  }

  addEmployee(val:any){
    return this.http.post<any[]>(this.APIUrl + '/employees/', val);
  }

  updateEmployee(val:any){
    return this.http.put<any[]>(this.APIUrl + '/employees/', val);
  }

  deleteEmployee(val:any){
    return this.http.delete<any[]>(this.APIUrl + '/employees/'+ val);
  }

  UploadPhoto(val:any){
    return this.http.put<any[]>(this.PhotoUrl + '/SaveFile/', val);
  }

  getAllDepartmentNames(): Observable<any[]>{
    return this.http.get<any[]>(this.APIUrl + '/department');
  }
}
