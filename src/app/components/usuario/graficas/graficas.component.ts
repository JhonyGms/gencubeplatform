import { Component, OnInit } from '@angular/core';
import { ChartType, ChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { GraficasService } from '../../../services/graficas.service'

@Component({
  selector: 'app-graficas',
  templateUrl: './graficas.component.html',
  styleUrls: ['./graficas.component.css']
})
export class GraficasComponent implements OnInit {

    // Pie
    public pieChartOptions: ChartOptions = {
      responsive: true,
      legend: {
        position: 'top',
      },
      plugins: {
        datalabels: {
          formatter: (value, ctx) => {
            const label = ctx.chart.data.labels[ctx.dataIndex];
            return label;
          },
        },
      }
    };

    public pieChartLabels: Label[] = ['Asistidos', 'Faltantes'];
    public pieChartData: number[] = [300, 500];
    public pieChartType: ChartType = 'pie';
    public pieChartLegend = true;
    public pieChartPlugins = [pluginDataLabels];
    public pieChartColors = [
      {
        backgroundColor: ['rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)'],
      },
    ];
  

  constructor(
    public GraficasServices: GraficasService
  ) { }

  ngOnInit(): void {

    this.actualizarQou();

  }


  
  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  actualizarQou() {
    this.GraficasServices.quorum()
    .subscribe(res =>{
      console.log(res)
      this.pieChartData = res
    })
  }
}
