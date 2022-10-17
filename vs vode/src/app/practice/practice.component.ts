import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-practice',
  templateUrl: './practice.component.html',
  styleUrls: ['./practice.component.css']
})
export class PracticeComponent implements OnInit {

  panelOpenState = false;
  private _snackBar: any;
  
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
  constructor() { }

  ngOnInit(): void {
  }

}
