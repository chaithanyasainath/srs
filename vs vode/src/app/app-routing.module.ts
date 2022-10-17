import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClaculatorComponent } from './claculator/claculator.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EmployeeAttendanceComponent } from './employee-attendance/employee-attendance.component';
import { EmployeemasterAddComponent } from './employeemaster/employeemaster-add/employeemaster-add.component';
import { EmployeemasterComponent } from './employeemaster/employeemaster.component';
import { HomeComponent } from './home/home.component';
import { PracticeComponent } from './practice/practice.component';

const routes: Routes = [
   { path: 'home',component:HomeComponent },
   { path: 'claculator', component: ClaculatorComponent },
   { path: 'practice', component: PracticeComponent },
   { path: 'employeemaster', component: EmployeemasterComponent },
   { path: 'employeemasteradd',  component: EmployeemasterAddComponent },
   { path: 'employeeattendance', component: EmployeeAttendanceComponent },
   { path: 'dashboard', component: DashboardComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }