import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EmployeeAttendance } from './model/employee-attendance';

@Injectable({
  providedIn: 'root'
})
export class EmployeeattendanceService {
  private REST_API_SERVER = "https://astoriatrainingapi20220518103836.azurewebsites.net/api/Employeeattendances";

  constructor(private httpClient: HttpClient) { }
  
  GetEmployeeAttendance(filterDate: string, companyID: number) {
    return this.httpClient.get(this.REST_API_SERVER + "/GetEmployeeAttendance?filterDate="+filterDate+"&CompanyId="+companyID);

  }
  //POST EMPLOYEE ATTENDANCE

 postAttendance(attendance: EmployeeAttendance[]): Observable<EmployeeAttendance[]> {
   return this.httpClient.post<EmployeeAttendance[]>("https://astoriatrainingapi20220518103836.azurewebsites.net/api/Employeeattendances/PostEmployeeAttendance", attendance)
  
}
}