import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { Chart } from 'chart.js';
import { Dashboard } from '../model/dashboard';
import ChartDataLabels from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})


export class DashboardComponent implements OnInit {

  count: number[] = [];
  hours: any[] = [];
  salary: any[] = [];
  hoursalary: any[] = [];
  workingHours : any[] = [];

  pieChartLabels: string[] = ['Active Employee', 'Resigned Employee'];
  pieData: any[] = [];
  pieChartLegend = {
    display: true,
    position: 'right'
  };

  barhourX: any[] = [];
  barhourY: any[] = [];


  barsalaryX: any[] = [];
  barsalaryY: any[] = [];


  barhoursalaryX: any[] = [];
  barhoursalaryY: any[] = [];
  barhoursalaryY1: any[] = [];
  
  

  constructor(private dataService: DashboardService) {

  }

  ngOnInit(): void {
    Chart.register(ChartDataLabels);
    this.Piechart();
    this.BarchartHOURS();
    this.BarchartSALARY();
    this.BarchartHS();
  }

  Piechart() {
    this.dataService.GetEmployeeCount().subscribe(data => {

      this.count = data as number[];
      this.pieData = this.count
      let PieChartId = new Chart('PieChartId', {

        type: 'pie',

        data: {
          labels: this.pieChartLabels,
          datasets: [{

            data: this.pieData,
          }]
        }
      });

    })
  }
  BarchartHOURS() {
    this.dataService.GetDayAndWorkingHours().subscribe(data => {

      this.hours = data as Dashboard[];

      this.barhourY = this.hours.map(x => x.totalWorkingHours);

      this.barhourX = this.hours.map(x => x.stringDate);

      let BarChartIdWH = new Chart('BarChartIdWH', {

        type: 'bar',

        data: {
          labels: this.barhourX,

          datasets: [{

            data: this.barhourY,

          }]

          


        },
        options: {

          plugins: {

            legend: {
              display: false,
            },


          },
        }

      })
    })
  }


  BarchartSALARY() {
    this.dataService.DaysVsSalary().subscribe(data => {
      console.log(data);
      this.salary = data as Dashboard[];
      this.barsalaryY = this.salary.map(x => x.totalSalary);
      this.barsalaryX = this.salary.map(x => x.stringDate);
            
      console.log(this.barsalaryX);
      let BarChartIdSAL = new Chart('BarChartIdSAL', {
        type: 'bar',
        data: {
          labels: this.barsalaryX,
          datasets: [{
            data: this.barsalaryY,
          }
          ]
        },
        options: {
          plugins: {
            legend: {
              display: false,
            },
          },
        }
      })
    });
  }
  
  BarchartHS() {
    this.dataService.DaysVsSalary().subscribe(data => {
      this.dataService.GetDayAndWorkingHours().subscribe(result => {
      //console.log(data);
      this.hoursalary = data as Dashboard[];
      this.workingHours = result as Dashboard[];
      this.barhoursalaryY = this.hoursalary.map(x => x.totalSalary);
      this.barhoursalaryX = this.hoursalary.map(x => x.stringDate);
      this.barhoursalaryY1 = this.workingHours.map(x => x.totalWorkingHours);
      console.log(this.barsalaryX);
      let BarChartIdHS = new Chart('BarChartIdHS', {
        type: 'bar',
        data: {
          labels: this.barhoursalaryX,
          datasets: [{
            data: this.barhoursalaryY,
          },
          {
            data: this.barhoursalaryY1,
          }
          ]
        },
        options: {
          plugins: {
            legend: {
              display: false,
            },
          },
        }
      })
    });
  });
  }

}





