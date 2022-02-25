import { Component, OnInit, Input } from '@angular/core';
import { GraficasService } from '../../../services/graficas.service'
import { MatDialog } from '@angular/material/dialog'
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component'
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Label } from 'ng2-charts';
import { PdfService } from '../../../services/pdf.service'
import { PdfMakeWrapper, Txt, Table } from 'pdfmake-wrapper';
import { ITable } from 'pdfmake-wrapper/lib/interfaces';

var pdfFonts = require('pdfmake/build/vfs_fonts.js');
PdfMakeWrapper.setFonts(pdfFonts);

interface DataResponse {
  usuario: string
  voto: string
}

type TableRow = [string,string]

@Component({
  selector: 'app-votaciones',
  templateUrl: './votaciones.component.html', 
  styleUrls: ['./votaciones.component.css']
})
export class VotacionesComponent implements OnInit {

  public barChartOptions: ChartOptions = {
    responsive: true,

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

  public barChartData: ChartDataSets[] = [];

  pporcentaje = []

  @Input() ids = {}

  estado = ''

  data = []

  constructor( 
    public GraficasServices: GraficasService ,
    public dialog: MatDialog,
    public PdfServices: PdfService
    ) { }

  ngOnInit(): void {
    if (this.ids['estado'] == 'activado') {
      this.estado = this.ids['estado']
    }

    this.GraficasServices.resultadoVotaciones(this.ids)
    .subscribe(res => {
      console.log(res)
      this.barChartData = res[0]
      this.barChartData.push({data:[0], label: ''})
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

  public Desactivar(): void {
    this.estado = ''
    
    this.GraficasServices.votacionesDesactivar(this.ids)
    .subscribe(res => {
      console.log(res)
      const dialogref = this.dialog.open(ConfirmDialogComponent,{data:{title:"La votacion fue Cerrada Totalmente",text:""}})
      dialogref.afterClosed()
      .subscribe(res => {
        
      })
    }, err => {
      console.log(err)
    })

  }

  ActivarQuorum(){

  }

  CERRAR(){
    this.GraficasServices.resultadoVotacionessave(this.ids)
    .subscribe(res => {
      console.log(res)
      const dialogref = this.dialog.open(ConfirmDialogComponent,{data:{title:"La votacion fue Cerrada ",text:""}})
      dialogref.afterClosed()
      .subscribe(res => {
        
      })
    }, err => {
      console.log(err)
    })
  }

  public activar(): void {
    this.estado = 'activado'

    this.GraficasServices.votacionesActivar(this.ids)
    .subscribe(res => {
      console.log(res)
      const dialogref = this.dialog.open(ConfirmDialogComponent,{data:{title:"La votacion fue Activada ",text:""}})
      dialogref.afterClosed()
      .subscribe(res => {
        
      })
    }, err => {
      console.log(err)
    })
  }

  async genereat(){
    const pdf = new PdfMakeWrapper();
    pdf.defaultStyle({
      fontSize: 15
    });
    await this.PdfServices.pdfvotaciones(this.ids)
    .subscribe(res =>{
      console.log(res)
      pdf.add(this.createTabla(res))
      pdf.create().open();
    })
    
  }

  createTabla(data: DataResponse[]): ITable{
    
    return new Table([
      ['usuario', 'voto'],
      ...this.extrarData(data)
      //data
    ])
    .heights( rowIndex => {
      return rowIndex === 0 ? 20 : 0;
    })
    .layout('lightHorizontalLines')
    .end
  }

  extrarData(data: DataResponse[]): TableRow[]{
    return data.map(row => [row.usuario, row.voto])
  }
 
}
