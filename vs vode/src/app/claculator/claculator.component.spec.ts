import { ComponentFixture, TestBed } from '@angular/core/testing';



import { ClaculatorComponent } from './claculator.component';



describe('ClaculatorComponent', () => {

  let component: ClaculatorComponent;

  let fixture: ComponentFixture<ClaculatorComponent>;



  beforeEach(async () => {

    await TestBed.configureTestingModule({

      declarations: [ ClaculatorComponent ]

    })

    .compileComponents();

  });



  beforeEach(() => {

    fixture = TestBed.createComponent(ClaculatorComponent);

    component = fixture.componentInstance;

    fixture.detectChanges();

  });



  it('should create', () => {

    expect(component).toBeTruthy();

  });

});