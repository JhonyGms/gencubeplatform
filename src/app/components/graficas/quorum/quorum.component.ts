import { Component, OnInit, Input } from '@angular/core';
import { ChartType, ChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { GraficasService } from '../../../services/graficas.service'
import { PdfService } from '../../../services/pdf.service'
import { PdfMakeWrapper, Txt, Table } from 'pdfmake-wrapper';
import { ITable } from 'pdfmake-wrapper/lib/interfaces';

var pdfFonts = require('pdfmake/build/vfs_fonts.js');
PdfMakeWrapper.setFonts(pdfFonts);

interface DataResponse {
  usuario: string
    nombres: string
    apellidos: string
    torre: string
    apartamento:  string
    fecha: string
  
}

interface DataResponse2 {
  Nombres: string
  Apellidos: string
  torre: string
  apartamento: string
  correo:  string
  documento: string 
  celular: string 
}

type TableRow = [string,string,string,string,string,string]
type TableRow2 = [string,string,string,string,string,string,string]

@Component({
  selector: 'app-quorum',
  templateUrl: './quorum.component.html',
  styleUrls: ['./quorum.component.css']
})
export class QuorumComponent implements OnInit {

  
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

  @Input() id = {}

  constructor(
    public GraficasServices: GraficasService,
    public PdfServices: PdfService
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
    this.GraficasServices.quorumadmin(this.id)
    .subscribe(res =>{
      console.log(res)
      this.pieChartData = res
    })
  }


  async genereat(){
    const pdf = new PdfMakeWrapper();
    pdf.defaultStyle({
      fontSize: 6
    });
    await this.PdfServices.pdfquorum(this.id)
    .subscribe(res =>{
      console.log(res)
      pdf.add(this.createTabla(res))
      pdf.create().open();
    })
    
  }

  createTabla(data: DataResponse[]): ITable{
    
    return new Table([
      ['usuario', 'nombres', 'apellidos', 'torre', 'apartamento', 'fecha'],
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
    return data.map(row => [row.usuario, row.nombres, row.apellidos, row.torre, row.apartamento, row.fecha])
  }
 



  async genereatat(){
    const pdf = new PdfMakeWrapper();
    pdf.defaultStyle({
      fontSize: 6
    });
    await this.PdfServices.pdfquorumactualizado(this.id)
    .subscribe(res =>{
      console.log(res)
      pdf.add(this.createTabla2(res))
      pdf.create().open();
    })
    
  }


  createTabla2(data: DataResponse2[]): ITable{
    
    return new Table([
      ['usuario', 'nombres', 'apellidos', 'torre', 'apartamento', 'documento', 'celular'],
      ...this.extrarData2(data)
      //data
    ])
    //.widths([100,20,20,20,20,20,20])
    .heights( rowIndex => {
      return rowIndex === 0 ? 20 : 0;
    })
    .layout('lightHorizontalLines')
    .end
  }

  extrarData2(data: DataResponse2[]): TableRow2[]{
    return data.map(row2 => [row2.Nombres, row2.Apellidos, row2.torre, row2.apartamento, row2.correo, row2.documento, row2.celular])
  }
}
