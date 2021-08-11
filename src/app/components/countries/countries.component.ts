import { Component, OnInit } from '@angular/core';
import { GlobalDataSummary } from 'src/app/models/global-data';
import { DataServiceService } from 'src/app/services/data-service.service';

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
  constructor(private dataService:DataServiceService) { }

  ngOnInit(): void {
    this.dataService.getGlobalData().subscribe(result=>{
      this.data=result;
      this.data.forEach(cs=>{
         this.countries.push(cs.country);
      })
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
    
  }


}
