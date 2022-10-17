import { Component, OnInit } from '@angular/core';



@Component({

  selector: 'app-claculator',

  templateUrl: './claculator.component.html',

  styleUrls: ['./claculator.component.css']

})

export class ClaculatorComponent implements OnInit {



  constructor() { }



  ngOnInit(): void {

  }



  result = "";

  firstValue = 0;

  secondValue = 0;



  AddNumbers(){

    this.result = (Number(this.firstValue) +Number(this.secondValue)).toString();

  }

  SubNumbers(){

    this.result = (Number(this.firstValue) -Number(this.secondValue)).toString();

  }

  MulNumbers(){

    this.result = (Number(this.firstValue) *Number(this.secondValue)).toString();

  }

  DivNumbers(){

    this.result = (Number(this.firstValue) /Number(this.secondValue)).toString();

  }

}