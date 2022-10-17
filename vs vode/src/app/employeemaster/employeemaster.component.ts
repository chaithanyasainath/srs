import { EmployeemasterdataService } from '../service/employeemasterdata.service';
import { MatTableDataSource } from '@angular/material/table';
import { Employeemaster } from '../model/employeemaster';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { EmployeemasterAddComponent } from './employeemaster-add/employeemaster-add.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-employeemaster',
  templateUrl: './employeemaster.component.html',
  styleUrls: ['./employeemaster.component.css']
})
export class EmployeemasterComponent implements OnInit, AfterViewInit {
  public displayedColumns = ['employeeId', 'empName', 'empCompanyName', 'empDesignationName', 'empJoiningDate', 'empGender', 'update', 'delete'
  ];
  public dataSource = new MatTableDataSource<Employeemaster>();

  public doFilter = (event: any) => {
    this.dataSource.filter = event.target.value.trim().toLocaleLowerCase();
  }

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  isLoading = true;
  isEmpInUse: any;

  constructor(private dataService: EmployeemasterdataService, public dialog: MatDialog) { }

  ngOnInit() {
    this.loadEmployees();
  }
  loadEmployees() {
    this.dataService.sendGetRequest().subscribe((data) => {
      this.dataSource.data = data as Employeemaster[];
      this.isLoading = false;
      console.log(data);
    })

  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  openAddDialog() {
    const dialogRef = this.dialog.open(EmployeemasterAddComponent, {
      data: 0

    });
    dialogRef.afterClosed().subscribe(result => {
      {
        this.loadEmployees();
      }
    });
  }
  openEditDialog(employeeKey: any) {
    const dialogRef = this.dialog.open(EmployeemasterAddComponent, {
      data: employeeKey
    });
    dialogRef.afterClosed().subscribe(result => {
      {
        this.loadEmployees();
      }
    });

  }
  deleteRecord(employeeKey: number) {
    // this.dataService.getEmployeeInUse(employeeKey).subscribe(data => {
    //   this.isEmpInUse = data as boolean;
    //   if (this.isEmpInUse) {
    //     Swal.fire("", "Employee is in use record cannot be deleted", "error");

    //   }
    //   else {
       if (confirm("Are you sure ?")) {
          this.dataService.deleteEmployee(employeeKey).subscribe(
            (data) => {
            this.loadEmployees();
          },
          (error)=>
          {
            if(error.statusText == 'Conflict')
            {
              Swal.fire("", "Employee is in use record cannot be deleted", "error");

            }
            console.log(error);
          });
      }
      // }
    // }
    // )
  }
}

