
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Employeemaster } from '../model/employeemaster';
import { catchError, Observable, throwError } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class EmployeemasterdataService {
  getEmployees() {
    throw new Error('Method not implemented.');
  }
  parentForm: any;

  private REST_API_SERVER = "https://astoriatrainingapi20220518103836.azurewebsites.net/api/EmployeeMasters";

  constructor(private httpClient: HttpClient) { }
  
  
  public sendGetRequest(){
    return this.httpClient.get(this.REST_API_SERVER);
  }

  public getEmployeesById(empKey:number) : Observable<Employeemaster>{
    return this.httpClient.get<Employeemaster>(this.REST_API_SERVER + "/" +empKey);
  }
  public getEmployeeIDExists(empKey: number,empid: string){
    return this.httpClient.get<boolean>(this.REST_API_SERVER +"/empidexists?employeeKey=" + empKey +"&employeeId=" + empid);
  } 
  public getEmployeeInUse(empKey: number){
    return this.httpClient.get<boolean>(this.REST_API_SERVER +"/checkempinuse?employeeKey=" + empKey);
  } 
  //Get companies
  public getCompanies(){
    return this.httpClient.get(this.REST_API_SERVER + "/company");

  }
  //Get designation
  public getDesignations(){
    return this.httpClient.get(this.REST_API_SERVER + "/designation");
  }
  //post employee
  public postEmployeeData(employee: Employeemaster): Observable<Employeemaster>{
    return this.httpClient.post<Employeemaster>("https://astoriatrainingapi20220518103836.azurewebsites.net/api/EmployeeMasters/postEmployeeData", employee)
    .pipe(catchError(this.handleError));;
  }
  //put employee
  public putEmployee(employee: Employeemaster){
    //employee.employeeKey= 2;
    return this.httpClient.put<Employeemaster>(this.REST_API_SERVER+ "/"+ employee.employeeKey, employee)
    .pipe(catchError(this.handleError));;
} 
//delete employee
public deleteEmployee(empKey: number){
  return this.httpClient.delete(this.REST_API_SERVER+ "/"+ empKey)

}
//Error Handling
handleError(error: HttpErrorResponse){
  let errorMessage = 'Unkown error!';
  if (error.error instanceof ErrorEvent){
    //client-side errors
    errorMessage = ` Error: ${error.error.message}`;
  }
  else{
    //server-side errors
    errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
  }
  window.alert(errorMessage);
  return throwError(errorMessage);
}
}