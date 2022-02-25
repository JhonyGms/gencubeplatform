import { Component, OnInit,Input } from '@angular/core';
import { GraficasService } from '../../../services/graficas.service'
import { MatDialog } from '@angular/material/dialog'
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component'
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-votacionesusuario',
  templateUrl: './votacionesusuario.component.html',
  styleUrls: ['./votacionesusuario.component.css']
})
export class VotacionesusuarioComponent implements OnInit {

  
  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] }, 
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };

  public barChartLabels: Label[] = ['Quorum'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [pluginDataLabels];

  // public barChartData: ChartDataSets[] = [
  //   { data: [65], label: 'SI' },
  //   { data: [28], label: 'NO' }
  // ];

  public barChartData: ChartDataSets[] = [];

  pporcentaje = []

  @Input() ids = {}

  estado = ''

  data = []

  
  constructor( 
    public GraficasServices: GraficasService ,
    public dialog: MatDialog
    ) { }

  ngOnInit(): void {
    if (this.ids['estado'] == 'activado') {
      this.estado = this.ids['estado'] 
    }

    this.GraficasServices.resultadoVotacionesdos(this.ids) 
    .subscribe(res => {
      console.log(res)
      this.barChartData = res[0]
      this.pporcentaje = res[1]


    }, err => {
      console.log(err)
    })

    this.barChartLabels = [`${this.ids['nombre']}`]
   
  }


  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }


}
