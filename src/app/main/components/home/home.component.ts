import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import firebase from 'firebase/app';
import { AppService } from 'src/app/services/app.service';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  //ข้อมูลผู้ใช้ที่ login
  userLogin!: firebase.User;

  constructor(
    private app: AppService,
    private auth: AngularFireAuth,
    private router: Router
<<<<<<< HEAD
  ) {}

  ngOnInit() {
  }

  //Bar chart
=======

  ) {
  }

  ngOnDestroy() {
  }

  ngOnInit() {

}

//Bar chart
>>>>>>> f554c404139eac5a7adfba03df3fd50c0fc12d7b
  barChartType: ChartType = 'bar';
  barChartLabels: Label[] = ['Cats', 'Dogs', 'Rabbits', 'Birds'];
  barChartData: ChartDataSets[] = [
    {
      label: 'จำนวนสัตว์เลี้ยง',
      data: [40, 48, 40, 20],
      backgroundColor: ['rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)'
      ],
      borderColor: ['rgba(255,99,132,1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)'
      ],
      borderWidth: 2,
      hoverBackgroundColor: '#CCD1D1',
      hoverBorderColor: '#99A3A4',
      hoverBorderWidth: 2
    }
  ];
  barChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  };
  barChartLegend = true;
  barChartPlugins = [];

  //Pie chart
  pieChartType: ChartType = 'pie';
  pieChartLabels: Label[] = ['Cats', 'Dogs', 'Rabbits', 'Birds'];
  pieChartData: ChartDataSets[] = [
    {
      data: [40, 48, 40, 20],
      backgroundColor: ['rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)'
      ],
      borderColor: ['rgba(255,99,132,1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)'
      ],
      borderWidth: 2,
      hoverBackgroundColor: '#CCD1D1',
      hoverBorderColor: '#99A3A4',
      hoverBorderWidth: 2
    }
  ];
  pieChartOptions: ChartOptions = {
    responsive: true
  };
  pieChartLegend = true;
  pieChartPlugins = [];
  }