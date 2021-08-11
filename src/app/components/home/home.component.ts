import { Component, OnInit } from '@angular/core';
import { DataServiceService } from 'src/app/services/data-service.service';
import { GlobalDataSummary } from 'src/app/models/global-data';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  totalConfirmed = 0;
  totalActive = 0;
  totalDeaths = 0;
  totalRecovered = 0;
  loading = true;
  globalData: GlobalDataSummary[] =[];
  datatable:any = [];
  chart = {
    PieChart : "PieChart" ,
    ColumnChart : 'ColumnChart' ,
    LineChart : "LineChart", 
    height: 500, 
    options: {
      animation:{
        duration: 1000,
        easing: 'out',
      },
      is3D: true
    }  
  }
  
  
  constructor(private dataService: DataServiceService) { }


  
  ngOnInit(): void {

    this.dataService.getGlobalData()
      .subscribe(
        {
          next: (result) => {
            console.log(result);
            this.globalData = result;
            result.forEach(cs => {
              if (!Number.isNaN(cs.confirmed)) {
                if(cs.active)
                this.totalActive += cs.active
                if(cs.confirmed)
                this.totalConfirmed += cs.confirmed
                if(cs.deaths)
                this.totalDeaths += cs.deaths
                if(cs.active)
                this.totalRecovered += cs.active
              }

            })

            this.initChart('c');
          }, 
          complete : ()=>{
            this.loading = false;
          }
        }
      )
  }



  updateChart(input: HTMLInputElement) {
    console.log(input.value);
    this.initChart(input.value)
  }

  initChart(caseType: string) {

    this.datatable = [];
    // this.datatable.push(["Country", "Cases"])
    
    this.globalData.forEach(cs => {
      let value :number =0 ;
      if (caseType == 'c' && cs.confirmed)
        if (cs.confirmed > 200000)
          value = cs.confirmed
          
      if (caseType == 'a' && cs.active)
        if (cs.active > 200000)
          value = cs.active
      if (caseType == 'd' && cs.deaths)
        if (cs.deaths > 10000)
          value = cs.deaths
          
      if (caseType == 'r' && cs.recovered)
        if (cs.recovered > 200000)
            value = cs.recovered
        
        if(cs.country)
        this.datatable.push([
            cs.country, value
          ])
    })
    console.log(this.datatable);

  }

}