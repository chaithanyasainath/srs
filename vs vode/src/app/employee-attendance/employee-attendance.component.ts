import { Component, OnInit, ViewChild } from '@angular/core';
import { EmployeemasterdataService } from '../service/employeemasterdata.service';
import { MatTableDataSource } from '@angular/material/table';
import { CompanyMaster } from 'src/app/model/companymaster';
import { EmployeeattendanceService } from '../employeeattendance.service';
import { EmployeeAttendance } from '../model/employee-attendance';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-employee-attendance',
  templateUrl: './employee-attendance.component.html',
  styleUrls: ['./employee-attendance.component.css']
})
export class EmployeeAttendanceComponent implements OnInit {
  public displayedColumns = ['employeeID', 'empName', 'clockDate', 'timeIn', 'timeOut', 'remarks'
  ];
  public dataSource = new MatTableDataSource<EmployeeAttendance>();

  public doFilter = (event: any) => {
    this.dataSource.filter = event.target.value.trim().toLocaleLowerCase();
  }

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;


  attendanceForm!: any;
  isValidTime: any;
  savedisable: boolean = true;
  originalDataList!: EmployeeAttendance[];
  originalData!: string;
  attendanceDatalist!: EmployeeAttendance[];
  constructor(private dataService: EmployeemasterdataService, private datePipe: DatePipe, private dataServiceAtt: EmployeeattendanceService, private attendanceservice: EmployeeattendanceService) { }
  cmpList!: CompanyMaster[];
  ClockDate!: Date;
  CompanyId!: number;
  maxDate = new Date();
  filterDate!: Date;
  employeeID!: string;
  datasaved!: string;
  timeintimeout!: string;
  missingfields!: string;




  ngOnInit(): void {
    this.loadCompaines();
    this.validateFormControl()
    this.filterDate = new Date()
  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  validateTimes(timeIn: string, timeOut: string) {
    this.isValidTime = true;
    if ((timeIn != null && timeOut != null) && (timeOut) < (timeIn)) {
      this.isValidTime = false;
    }
    return this.isValidTime;
  }
  validateFormControl() {
    this.attendanceForm = new FormGroup({
      filterDate: new FormControl('', [Validators.required]),
      CompanyId: new FormControl('', [Validators.required])
    });
  }
  public displayError = (controlName: string, errorName: string) => {
    return this.attendanceForm.controls[controlName].hasError(errorName);
  }

  loadCompaines() {
    this.dataService.getCompanies().subscribe(data => {
      this.cmpList = data as CompanyMaster[];
      
    })
  }
  loadattendance() {
    this.attendanceForm.markAllAsTouched();
    if (this.attendanceForm.isValid)
      return;
    let date = this.filterDate.toDateString();
    this.attendanceservice.GetEmployeeAttendance(date, this.CompanyId).subscribe(result => {
      this.attendanceDatalist = result as EmployeeAttendance[]
      this.dataSource.data = this.attendanceDatalist;

      this.originalData = JSON.stringify(this.dataSource.data);
      if (this.attendanceDatalist.length > 0) {
        this.savedisable = false;

      }
    });
  }
  //SAVE EMPLOYEE
  SaveEmployee() {
    let dataArray: any = [];
    this.datasaved = "";
    this.timeintimeout = "";
    this.missingfields = "";
    this.originalDataList = JSON.parse(this.originalData);
    this.dataSource.data.forEach((result, d) => {
      if (result.timeIn != this.originalDataList[d].timeIn || result.timeOut != this.originalDataList[d].timeOut || result.remarks != this.originalDataList[d].remarks) {
        var ea = new EmployeeAttendance();
        let date = this.datePipe.transform(result.clockDate, "yyyy-MM-dd");
        ea.clockDate = date as unknown as Date;
        ea.employeeKey = result.employeeKey
        //CONDITIONS
        if
          ((result.timeIn == '' && result.timeOut != '' && result.remarks == '') ||
          (result.timeIn != '' && result.timeOut == '' && result.remarks == '') ||
          (result.timeIn == '' && result.timeOut != '' && result.remarks != '') ||
          (result.timeIn != '' && result.timeOut == '' && result.remarks != '') ||
          (result.timeIn == '' && result.timeOut == '' && result.remarks != '') ||
          (result.timeIn != '' && result.timeOut != '' && result.remarks == '')) {

          //MISSING FILEDS
          this.employeeID = result.employeeID
          this.missingfields = this.missingfields + result.employeeID + ",";

        }
        else {
          if (result.timeIn != '' && result.timeOut != '' && result.remarks != '') {
            ea.timeIn = date + 'T' + result.timeIn;
            ea.timeOut = date + 'T' + result.timeOut;
            ea.remarks = result.remarks;
            this.validateTimes(ea.timeIn, ea.timeOut);
            //DATASAVED
            if (this.isValidTime) {
              dataArray.push(ea);
              this.dataServiceAtt.postAttendance(dataArray).subscribe(data => {
              });
              this.datasaved = this.datasaved + result.employeeID + ",";
            }
            //INVAILD TIME
            else {
              this.employeeID = result.employeeID;
              this.timeintimeout = this.timeintimeout + result.employeeID+ ",";
            }
          }

        }
        this.allswal();
      };
    });
  }
//SAVING ALL THE METHODS
  allswal() {
    let message = '';
   
    if (this.datasaved != '') {
      
      message = message + "<br/>Data Saved For EmployeeId:<br/>" + this.datasaved.replace(/,\s*$/, "");
    }
    if (this.timeintimeout != '') {
      message = message + "<br/>TimeOut Is Less Than TimeIn On EmployeeId:<br/>" + this.timeintimeout.replace(/,\s*$/, "");
    }
    if (this.missingfields != '') {
      message = message + "<br/>Missing Fields Of TimeIn/TimeOut/Remarks On EmployeeId:<br/>" + this.missingfields.replace(/,\s*$/, "");
    }
//MESSAGE WILL SAVE ONLY WHEN !=''
    if (message != '') {
      Swal.fire("", message, "info");
//DATA FILEDS WILL NOT GET REFRESHED     
      if (this.datasaved != '' && this.timeintimeout == '' && this.missingfields == '') {
        this.loadattendance();
      }
    }
    
  }
}


