import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { ClaculatorComponent} from './claculator/claculator.component';
import { PracticeComponent } from './practice/practice.component';
import { MatListModule } from '@angular/material/list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AppRoutingModule } from './app-routing.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule} from '@angular/material/sidenav';
import { HomeComponent } from './home/home.component';
import { EmployeemasterComponent } from './employeemaster/employeemaster.component';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { EmployeemasterAddComponent } from './employeemaster/employeemaster-add/employeemaster-add.component';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { enableProdMode } from '@angular/core';
import { MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { EmployeeAttendanceComponent } from './employee-attendance/employee-attendance.component';
import {DatePipe} from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
//import { ChartsModule } from 'ng2-charts/ng2-charts';
//import { ChartModule } from 'angular2-chartjs';
import { NgChartsModule } from 'ng2-charts';


@NgModule({
  declarations: [
    AppComponent,
    ClaculatorComponent,
    PracticeComponent,
    HomeComponent,
    EmployeemasterComponent,
    EmployeemasterAddComponent,
    EmployeeAttendanceComponent,
    DashboardComponent
        
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    MatListModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatCardModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatInputModule,
    MatMenuModule,
    MatPaginatorModule,
    MatSnackBarModule,
    AppRoutingModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    HttpClientModule,
    MatTableModule,
    MatSortModule,
    MatDialogModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatButtonModule ,
    NgChartsModule
    
  ],
  
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
