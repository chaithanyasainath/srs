import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmployeemasterComponent } from './employeemaster.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { EmployeemasterdataService } from '../service/employeemasterdata.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormBuilder } from '@angular/forms';



fdescribe('EmployeemasterComponent', () => {
  let component: EmployeemasterComponent;
  let fixture: ComponentFixture<EmployeemasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeemasterComponent ],
      imports: [HttpClientTestingModule, MatFormFieldModule,
        MatInputModule, BrowserAnimationsModule, MatDialogModule, BrowserDynamicTestingModule,
         MatFormFieldModule,  MatInputModule, MatFormFieldModule],
      providers: [ EmployeemasterdataService,FormBuilder]
      })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeemasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
      
  it('In the form FIRST column is EmployeeID', () => {
    expect(component.displayedColumns[0]).toEqual("employeeId");
  });

  it('In the form SECOND column is EmployeeName', () => {
    console.log(component.displayedColumns[1]);
    expect(component.displayedColumns[1]).toContain("empName");
  });

  it('In the form THIRD column is CompanyName', () => {
    expect(component.displayedColumns[2]).toContain("empCompanyName");
  });

  it('In the form FOURTH column is DesignationName', () => {
    expect(component.displayedColumns[3]).toContain("empDesignationName");
  });

  it('In the form FIfTH column is JoiningDate', () => {
    expect(component.displayedColumns[4]).toContain("empJoiningDate");
  });

  it('In the form SIXTH column is Gender', () => {
    expect(component.displayedColumns[5]).toContain("empGender");
  });

  it('When we click on ADD BUTTON it should open the ADD DAILOG BOX ', () => {
    expect(component.openAddDialog).toBeTruthy();
  });

  
  it('When we click on DELETE BUTTON it should call DELETE RECORD', () => {
    expect(component.deleteRecord(37)).toBeTrue;
  });

  it('When we click on EDIT BUTTON it should OPEN EDIT DIALOG BOX ', () => {
      expect(component.openEditDialog).toBeTruthy();
    });
  
});