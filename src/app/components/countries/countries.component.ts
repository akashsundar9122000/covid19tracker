import { Component, OnInit } from '@angular/core';
import { DateWiseData } from 'src/app/models/date-wise-data';
import { GlobalDataSummary } from 'src/app/models/global-data';
import { DataServiceService } from 'src/app/services/data-service.service';
import {map} from 'rxjs/operators';
import { merge } from 'rxjs';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit {

  data: GlobalDataSummary[]=[];
  countries:any[]=[];
  totalConfirmed :any=0;
  totalActive :any=0;
  totalRecovered :any=0;
  totalDeaths :any=0;
  dateWiseData:any;
  datatable:any=[]
  selectedCountryData:DateWiseData[]=[];
  loading = true;
  chart = {
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
  constructor(private dataService:DataServiceService) { }

  ngOnInit(): void {

    merge(
      this.dataService.getDateWiseData().pipe(
        map(result=>{
          this.dateWiseData = result;
        })
      ), 
      this.dataService.getGlobalData().pipe(map(result=>{
        this.data = result;
        this.data.forEach(cs=>{
          this.countries.push(cs.country)
        })
      }))
    ).subscribe(
      {
        complete : ()=>{
         this.updateValues('India')
         this.loading = false;
        }
      }
    )
    
  }
  updateChart(){
    this.datatable = [];
   // this.datatable.push(["Date" , 'Cases'])
    this.selectedCountryData.forEach(cs=>{
      this.datatable.push([cs.date , cs.cases])
    })
  }
  updateValues(country:string){
    console.log(country);
    this.data.forEach(cs=>{
      if(country==cs.country){
        this.totalActive=cs.active;
        this.totalConfirmed=cs.confirmed;
        this.totalDeaths=cs.deaths;
        this.totalRecovered=cs.recovered
      }
    })
    this.selectedCountryData=this.dateWiseData[country];
    //console.log(this.selectedCountryData);
    this.updateChart();
  }


}
