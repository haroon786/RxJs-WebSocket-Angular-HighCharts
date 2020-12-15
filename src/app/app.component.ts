import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import {webSocket} from 'rxjs/webSocket';
import {HttpClient} from '@angular/common/http';
import { of, Subscription } from 'rxjs';
import { concatMap, delay, map, mergeMap, take, takeWhile} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Angular-RxJsWebSocket-HighCharts';
  rate:any;
  rate$:Subscription;
  Highcharts: typeof Highcharts = Highcharts;
  chardata: any[] = [];
  chartOptions: any;
   subject = webSocket('wss://ws.coincap.io/prices?assets=bitcoin')

   constructor(private http:HttpClient)
   {

   }
  ngOnInit()
  {

    this.rate=this.subject.pipe(

      concatMap(item => of(item).pipe(delay(1000)))


    ).subscribe(data=>
      {
       this.rate=data;
        this.chardata.push(Number(this.rate.bitcoin))
        this.getChart()
       console.log(data)
      })
   

  }


  getChart() {
    this.chartOptions = {
      series: [{
        data: this.chardata,
      }, ],
      chart: {
        type: "line",
        zoomType: 'x'
      },
      title: {
        text: "linechart",
      },
    };
  }
}
