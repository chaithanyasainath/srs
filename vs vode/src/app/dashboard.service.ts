import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private REST_API_SERVER = "https://astoriatrainingapi20220518103836.azurewebsites.net/API/dashboard";
  constructor(private httpClient: HttpClient) { }

  GetEmployeeCount(){
    console.log(this.REST_API_SERVER +"/GetEmployeeCount")
  return this.httpClient.get(this.REST_API_SERVER +"/GetEmployeeCount");

  }
  GetDayAndWorkingHours(){
    console.log(this.REST_API_SERVER +"/DayAndWorkingHours")
  return this.httpClient.get(this.REST_API_SERVER +"/DayAndWorkingHours");
  }
  DaysVsSalary(){
    console.log(this.REST_API_SERVER +"/DaysVsSalary")
  return this.httpClient.get(this.REST_API_SERVER +"/DaysVsSalary");
  }

  
}
