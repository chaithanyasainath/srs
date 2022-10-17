import { ComponentFixture, TestBed } from "@angular/core/testing";
import { EmployeemasterAddComponent } from "./employeemaster-add.component";
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EmployeemasterComponent } from '../employeemaster.component';
import { DatePipe } from '@angular/common';

fdescribe("EmployeemasterAddComponent", () => {
  let component: EmployeemasterAddComponent;
  let fixture: ComponentFixture<EmployeemasterAddComponent>;
  

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmployeemasterAddComponent, EmployeemasterComponent],
      imports: [FormsModule, HttpClientModule, MatDialogModule,  FormsModule,
        ReactiveFormsModule, MatFormFieldModule, MatOptionModule,
        HttpClientTestingModule, MatSelectModule, MatInputModule, BrowserAnimationsModule, MatNativeDateModule],
      providers: [ { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} }, DatePipe]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeemasterAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

   it (' If given details is a VALID DATA it will return TRUE',()=>{
     component.parentForm.controls['employeeKey'].setValue(11);
     component.parentForm.controls['employeeId'].setValue('ATIL-101');
     component.parentForm.controls['empFirstName'].setValue('Chaithanya');
     component.parentForm.controls['empLastName'].setValue('Sainath');
     component.parentForm.controls['empGender'].setValue('M');
     component.parentForm.controls['empDesignationId'].setValue(1);
     component.parentForm.controls['empCompanyId'].setValue(4);
     component.parentForm.controls['empJoiningDate'].setValue('2022-02-22');
     component.parentForm.controls['empResignationDate'].setValue('');
     component.parentForm.controls['empHourlySalaryRate'].setValue(3000);
     expect(component.parentForm.valid).toBeTruthy();
   });
        

  it ('checking when the given INPUT for Gender is INVALID',()=>{
    component.parentForm.controls['empGender'].setValue('Male');
    expect(component.parentForm.controls['empGender'].valid).toBeFalse();
  });

   it ('The given INPUT for Salary rate should allow only decimals or numbers',()=>{
    component.parentForm.controls['empHourlySalaryRate'].setValue('33.c');
    expect(component.parentForm.controls['empHourlySalaryRate'].valid).toBeFalse();
  });
   
   it ('If the given INPUT for EmployeeID is Greater Than 20Length it will return INVALID',()=>{
     component.parentForm.controls['employeeId'].setValue('ATIL-33333333333333333333333333333');
     expect(component.parentForm.controls['employeeId'].valid).toBeFalse();
   });

   it ('If the given INPUT for FirstName is Greater Than 100Length it will return INVALID',()=>{
     component.parentForm.controls['empFirstName'].setValue('ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc');
     expect(component.parentForm.controls['empFirstName'].valid).toBeFalse();
   });

   it ('If the given INPUT for LastName is Greater Than 100Length it will return INVALID',()=>{
    component.parentForm.controls['empLastName'].setValue('sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss');
    expect(component.parentForm.controls['empLastName'].valid).toBeFalse();
  });

  it ('If the given INPUT for CompanyID is empty it will return INVALID',()=>{
    component.parentForm.controls['empCompanyId'].setValue('');
    expect(component.parentForm.controls['empCompanyId'].valid).toBeFalse();
  });

  it ('If the given INPUT for DesignationId is empty it will return INVALID',()=>{
    component.parentForm.controls['empDesignationId'].setValue('');
    expect(component.parentForm.controls['empDesignationId'].valid).toBeFalse();
  });

  it ('If the given INPUT for JoiningDate is empty it will return INVALID',()=>{
    component.parentForm.controls['empJoiningDate'].setValue('');
    expect(component.parentForm.controls['empJoiningDate'].valid).toBeFalse();
  });

 
  it ('If the given INPUT for FirstName is empty it will return INVALID',()=>{
    component.parentForm.controls['empFirstName'].setValue('');
    expect(component.parentForm.controls['empFirstName'].valid).toBeFalse();
  });

  it ('If the given INPUT for LastName is empty it will return INVALID',()=>{
    component.parentForm.controls['empLastName'].setValue('');
    expect(component.parentForm.controls['empLastName'].valid).toBeFalse();
  });

});