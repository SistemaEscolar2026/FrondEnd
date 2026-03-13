import { Component, Input,  ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ReportViewerModule } from 'ngx-ssrs-reportviewer-v2';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { environment } from 'src/environments/environment';

/**
* SESSION DONDE SE DEFINE LOS OBJETO PARA EL COMPONENTE
*/
@Component({
  standalone: true,
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
  imports: [
    ReportViewerModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ReportComponent {
  /**
* DEFINICION DE VARIABLE ENTRADA PARA ABRIR REPORT
*/
  @Input() set openReport(dato: string) {
    if (dato!="") {
      this.titulo = dato.split('|')[0];
      this.reportUrl = dato.split('|')[1];
      this.parameters = JSON.parse(dato.split('|')[2]);
      this.openModalStatic(this.modalreport, "ngDraggable modal-fullscreen modal-primary");
    }
  }
  /**
* DEFINICION DE VARIABLE CON RUTA DE SERVIDOR DE REPORTE
*/
  reportServer: string = environment.RUTAREPORT;
  /**
* DEFINICION DE VARIABLE CON RUTA DE REPORTE A INVOCAR
*/
  reportUrl: string = "";
  /**
* DEFINICION DE VARIABLE PARA DEFINIR SE ACEPTA PARAMETROS
*/
  showParameters: string = "true";
  /**
* DEFINICION DE VARIABLE DE LISTA DE PARAMETROS
*/
  parameters: any = {};
  /**
* DEFINICION DE VARIABLE DE LENGUAJE DE OPCION DEL REPORT
*/
  language: string = "es-ES";
  /**
* DEFINICION DE VARIABLE ANCHO
*/
  width: number = 100;
  /**
* DEFINICION DE VARIABLE ALTO
*/
  height: number = 100;
  /**
* DEFINICION DE PARA MOSTRAR OPCION DEL REPORT
*/
  toolbar: string = "true";

  /**
* DEFINICION DE VARIABLE DE MODAL DE REPORT
*/
  @ViewChild('modalreport') modalreport: any;
  /**
* DEFINICION DE VARIABLE DE TITULO DE REPORTE
*/
  titulo: string = "";
  /**
* DEFINICION DE VARIABLE DE REFERENCIA DE MODALES
*/
  modalRef: any;

  /**
* CONSTRUCTOR DE LA CLASE
*/
  constructor(_router: Router, private modalService: BsModalService) {
     }

  /**
* DEFINICION DE FUNCION DE CERRAR MODALES
*/
  cerrar() {
    this.hideModal();
  }
  /**
* DEFINICION DE FUNCION DE HIDDEN MODAL
*/
  hideModal() {
    if (this.modalRef != undefined) {
      this.modalRef.hide();
    }
  }
  /**
* DEFINICION DE FUNCION ABRIR MODALES STATICO
*/
  openModalStatic(content: string, tipo: string) {
    this.modalRef = this.modalService.show(
      content, { class: tipo, backdrop: 'static' });
  }
}
