import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validator, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Employeemaster } from 'src/app/model/employeemaster';
import { EmployeemasterdataService } from 'src/app/service/employeemasterdata.service';
import { DesignationMaster } from 'src/app/model/designationmaster';
import { CompanyMaster } from 'src/app/model/companymaster';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2'



@Component({
  selector: 'app-employeemaster-add',
  templateUrl: './employeemaster-add.component.html',
  styleUrls: ['./employeemaster-add.component.css']
})
export class EmployeemasterAddComponent implements OnInit {
  empIdExists!: boolean;
  isValidDate: boolean = true;



  constructor(public dialogRef: MatDialogRef<EmployeemasterAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: number,public datepipe: DatePipe, private fb: FormBuilder, private dataService: EmployeemasterdataService) { }

  public parentForm!: FormGroup;
  emp: Employeemaster = new Employeemaster();
  cmpList!: CompanyMaster[];
  desigList!: DesignationMaster[];
  title!: string;
  HideUpdateButton: boolean = false;
  isResignationDateEditable: boolean = true;
  HideSaveButton: boolean = false;
  orgJoiningDate!: Date;
  orgResignationDate!: Date;

  ngOnInit(): void {
    this.loadCompaines();
    this.loadDesignations();
    //console.log("EmployeeKey:" + this.data);

    if (this.data > 0) {
      this.title = "Edit Employee Details";
      this.getEmployeesById(this.data);
      this.HideUpdateButton = true;
      this.isResignationDateEditable = false;
      this.HideSaveButton = false;
    }
    else {
      this.title = "Add Employee Details";
      this.isResignationDateEditable = true;
      this.HideSaveButton = true;
      this.HideUpdateButton = false;
    }

    this.validateFormControl()

  }

  validateFormControl() {
    this.parentForm = new FormGroup({
      employeeKey: new FormControl(''),
      employeeId: new FormControl('', [Validators.required, Validators.maxLength(20), Validators.pattern('[A-Z0-9- ]*')]),
      empFirstName: new FormControl('', [Validators.required, Validators.maxLength(100), Validators.pattern('[a-zA-Z]*')]),
      empGender: new FormControl('', [Validators.required, Validators.pattern('[MF]*')]),
      empDesignationId: new FormControl('', [Validators.required]),
      empHourlySalaryRate: new FormControl('', [Validators.required, Validators.pattern('[0.0-9]*')]),
      empCompanyId: new FormControl('',[Validators.required]),
      empLastName: new FormControl('', [Validators.required, Validators.maxLength(100), Validators.pattern('[a-zA-Z]*')]),
      empJoiningDate: new FormControl('',[Validators.required]),
      empResignationDate: new FormControl(''),
    });
  }
  public displayError = (controlName: string, errorName: string) => {
    return this.parentForm.controls[controlName].hasError(errorName);
  }



  onCancel(): void {
    this.dialogRef.close();
  }
  onSubmit(): void {


    this.dialogRef.close();
  }

  validateDates(empJoiningDate: Date, empResignationDate: Date) {
  
    this.isValidDate = true;
    // empJoiningDate=new Date(JoiningDate);
    console.log(empJoiningDate,empResignationDate)
    if ((empJoiningDate != null && empResignationDate != null) && empResignationDate < empJoiningDate) {
      this.isValidDate = false;
    }
    return this.isValidDate;
  }

  getEmployeesById(empKey: number) {
    this.dataService.getEmployeesById(empKey).subscribe(data => {
      this.emp = data as Employeemaster;
      this.orgJoiningDate = this.emp.empJoiningDate;
      this.orgResignationDate = this.emp.empResignationDate;
      console.log(this.emp);
    })
  }
  saveEmployee(): void {
    this.parentForm.markAllAsTouched();
    if (this.parentForm.invalid)
      return;
    {
      this.dataService.getEmployeeIDExists(0, this.emp.employeeId)

        .subscribe(data => {

          this.empIdExists = data;

          if (this.empIdExists == false) {



            let emp: Employeemaster = this.parentForm.value;

            emp.empHourlySalaryRate = + emp.empHourlySalaryRate;

            this.emp.empJoiningDate.setHours(this.emp.empJoiningDate.getHours() + 5);

            this.emp.empJoiningDate.setMinutes(this.emp.empJoiningDate.getMinutes() + 30);

            this.dataService.postEmployeeData(this.emp).subscribe(data => {

              console.log(this.data);

              this.dialogRef.close();

            });
          }

          else {

            Swal.fire("", "Employee exists.", "error");

          }
        });
    }
  }


  //Update Employee
  updateEmployee() {
    this.parentForm.markAllAsTouched();
    if (!this.parentForm.invalid) {
      this.dataService.getEmployeeIDExists(this.emp.employeeKey, this.emp.employeeId)
        .subscribe(data => {
          this.empIdExists == data;
          this.empIdExists = data as boolean;
          console.log(this.empIdExists)
          if (!this.empIdExists) {
            //     return;
            //  }

            this.emp.empHourlySalaryRate = + this.emp.empHourlySalaryRate;
            if (this.orgJoiningDate != this.emp.empJoiningDate) {
              this.emp.empJoiningDate.setHours(this.emp.empJoiningDate.getHours() + 5);
              this.emp.empJoiningDate.setMinutes(this.emp.empJoiningDate.getMinutes() + 30);
            }

            if (this.emp.empResignationDate != null) {
              if (this.orgResignationDate != this.emp.empResignationDate) {
                this.emp.empResignationDate.setHours(this.emp.empResignationDate.getHours() + 5);
                this.emp.empResignationDate.setMinutes(this.emp.empResignationDate.getMinutes() + 30);
              }
              this.isValidDate = this.validateDates(new Date(this.emp.empJoiningDate.toString()),new Date(this.emp.empResignationDate.toString()));
            }
         
            if (this.isValidDate) {
              this.dataService.putEmployee(this.emp).subscribe(data => {
                console.log(this.data);
                this.dialogRef.close();
              });
            }
            else {
              Swal.fire("Employee", " Resgination Date should be grater then Joining date");

            }

          }

          else {

            Swal.fire("", "EmployeeID already exists", "error");
          }

        });
    
    }

  
  }

  loadCompaines() {
    this.dataService.getCompanies().subscribe(data => {
      this.cmpList = data as CompanyMaster[];
    })
  }

  loadDesignations() {
    this.dataService.getDesignations().subscribe(data => {
      this.desigList = data as DesignationMaster[];
    })
  }
}