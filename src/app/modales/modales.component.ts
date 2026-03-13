import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';

/**
* SESSION DONDE SE DEFINE LOS OBJETO PARA EL COMPONENTE
*/
@Component({
    standalone: true,
    selector: 'app-modales',
    templateUrl: './modales.component.html',
    styleUrls: ['./modales.component.scss']
})
export class ModalesComponent {
    /**
  * DEFINICION DE VARIABLE SALIDA CON RETORNO DE OK DE MODAL
  */
    @Output() aceptarOk = new EventEmitter<boolean>();
    @Output() aceptarInfo = new EventEmitter<boolean>();
    @Output() aceptarConfi = new EventEmitter<boolean>();
    @Output() aceptarConfieli = new EventEmitter<boolean>();
    @Output() aceptarConficarga = new EventEmitter<boolean>();
    
    /**
  * DEFINICION DE VARIABLE ENTRADA PARA LLAMAR MODALES
  */
    @Input() set llamarModal(dato: string) {
        this.titulo = dato.split('|')[1];
        this.mensaje = dato.split('|')[2];
        switch (dato.split('|')[0]) {
            case "1":
                this.openModalStatic(this.infoModal, "modal-dialog-centered modal-lg modal-primary");
                break;
            case "2":
                this.openModalStatic(this.alertamodal, "modal-dialog-centered modal-lg modal-primary");
                break;
            case "3":
                this.openModalStatic(this.okmodal, "modal-dialog-centered modal-lg modal-primary");
                break;
            case "4":
                this.openModalStatic(this.confirmacion, "modal-dialog-centered modal-md modal-primary");
                break;
            case "5":
                this.openModalStatic(this.confirmacioneliminar, "modal-dialog-centered modal-md modal-primary");
                break;
            case "6":
                this.openModalStatic(this.confirmacioncarga, "modal-dialog-centered modal-md modal-primary");
                break;
        }
    }
    /**
  * DEFINICION DE VARIABLE DE MODAL DE INFO GENERAL
  */
    @ViewChild('infoModal') infoModal: any;
    /**
  * DEFINICION DE VARIABLE DE MODAL DE ALERTAS
  */
    @ViewChild('alertamodal') alertamodal: any;
    /**
  * DEFINICION DE VARIABLE DE MODAL DE RESULTADOS OK
  */
    @ViewChild('okmodal') okmodal: any;
    @ViewChild('confirmacion') confirmacion: any;
    @ViewChild('confirmacioneliminar') confirmacioneliminar: any;
    @ViewChild('confirmacioncarga') confirmacioncarga: any;
    /**
  * DEFINICION DE VARIABLE DE REFERENCIA DE MODALES
  */
    modalRef: any;
    /**
  * DEFINICION DE VARIABLE DE TITULO DEL MODAL
  */
    titulo: string = "";
    /**
  * DEFINICION DE VARIABLE DE INFORMACION DEL MODAL
  */
    mensaje: string = "";

    /**
  * CONSTRUCTOR DE LA CLASE
  */
    constructor(private modalService: BsModalService,) {
    }
    /**
  * DEFINICION DE FUNCION DE CERRAR MODALES
  */
    cerrar(dato: number) {
        if (dato === 1) {
            this.aceptarOk.emit(true);
        }
        if (dato === 3) {
            this.aceptarInfo.emit(true);
        }
        if (dato === 4) {
            this.aceptarConfi.emit(true);
        }
        if (dato === 6) {
            this.aceptarConfieli.emit(true);
        }
        if (dato === 7) {
            this.aceptarConficarga.emit(true);
        }
        this.hideModal();
    }


    /**
  * DEFINICION DE FUNCION DE HIDE MODALES
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
        this.aceptarOk.emit(false);
        this.modalRef = this.modalService.show(
            content, { class: tipo, backdrop: 'static' });
    }

}
