import { Component, OnInit } from '@angular/core';
import { GoogleChartInterface } from 'ng2-google-charts';
import { GlobalDataSummary } from 'src/app/models/global-data';
import { DataServiceService } from 'src/app/services/data-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  totalConfirmed :any=0;
  totalActive :any=0;
  totalRecovered :any=0;
  totalDeaths :any=0;
  globalData: GlobalDataSummary[]=[];
  pieChart: GoogleChartInterface={
    chartType:'pieChart'
  }

  columnChart: GoogleChartInterface={
    chartType:'columnChart'
  }
  constructor(private dataService:DataServiceService) { }

  initChart(){

    let dataTable=[];
    dataTable.push(["Country","Cases"]);
    this.globalData.forEach(cs=>{
      if(cs.confirmed && +cs.confirmed>1000000)
        dataTable.push([cs.country,cs.confirmed]);
    })
    this.pieChart = {
      chartType: 'PieChart',
      dataTable:dataTable,
      //firstRowIsData: true,
      options: {
        height:500
      },
    };
    this.columnChart = {
      chartType: 'ColumnChart',
      dataTable:dataTable,
      //firstRowIsData: true,
      options: {
        height:500
      },
    };
  }
  ngOnInit(): void {
    this.dataService.getGlobalData().subscribe(
      {
        next:(result)=>{
          console.log(result);
          this.globalData=result;
          result.forEach(cs=>{
            if(!Number.isNaN(cs.confirmed)){
              this.totalActive+=cs.active;
              this.totalConfirmed+=cs.confirmed;
              this.totalDeaths+=cs.deaths;
              this.totalRecovered+=cs.recovered;
            }
          })
          this.initChart();
        }
      }
    )
  }
  

}
