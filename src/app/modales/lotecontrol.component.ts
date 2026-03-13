import { Component, EventEmitter, Output, Input, OnInit, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common';
import { BsModalService } from 'ngx-bootstrap/modal';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { GrdFilterPipe } from '../pipe/filterGrid';
import { ModalesComponent } from '@modales/modales.component';
import { Funcion } from '@funciones/funciones';

/**
* SESSION DONDE SE DEFINE LOS OBJETO PARA EL COMPONENTE
*/
@Component({
  standalone: true,
  selector: 'app-lotecontrol',
  templateUrl: './lotecontrol.component.html',
  styleUrls: ['./lotecontrol.component.scss'],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatSidenavModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatExpansionModule,
    CommonModule,
    GrdFilterPipe,
    ModalesComponent
  ]

})
export class LoteControlComponent implements OnInit {

  /**
* DEFINICION DE VARIABLE DE MODAL DE ENVASE CREACION
*/
  @ViewChild('modalloteenvase') modalloteenvase: any;
  /**
* DEFINICION DE VARIABLE PARA CARGA DE ENVASE
*/
  @Input() envaselote: any = {};
  /**
* DEFINICION DE VARIABLE PARA LISTADO DE LOTE
*/
  @Input() listadoControl: any[] = [];
  /**
* DEFINICION DE VARIABLE SENTIDO TRANSACCION
*/
  @Input() sentido: string = "";
  /**
* DEFINICION DE VARIABLE PARA HABILITAR CAMPOS
*/
  @Input() set habilitar(datos: boolean) {
    this.habilitabotones = datos;
  }
  /**
* DEFINICION DE VARIABLE SALIDA PARA RETORNAR INFORMACION DE MODAL
*/
  @Output() retornoGrid = new EventEmitter<any[]>();
  /**
* DEFINICION DE VARIABLE SALIDA PARA CERRAR MODAL
*/
  @Output() cierreModal = new EventEmitter<boolean>();
  /**
* DEFINICION DE VARIABLE PARA HABILITAR CAMPOS
*/
  habilitabotones: boolean = false;
  /**
* DEFINICION DE VARIABLE PARA ABRIR MODAL DE MENSAJES
*/
  llamarmodal: string = "";
  /**
* DEFINICION DE VARIABLE CON NOMBRE DE CAMPOS CABECERA DE GRID
*/
  ColumnaDetalle: any[] = ['Sel.', 'Lote', 'Nombre', 'Fecha Prod.', 'Fecha Cad.', 'Saldo', 'Cantidad', ''];
  /**
* DEFINICION DE VARIABLE CON NOMBRE DE CAMPOS CABECERA DE ENVASE
*/
  ColumnaDetalleEnvase: any[] = ['Lin.', 'Envase Inicial', 'Envase Final'];
  /**
* DEFINICION DE VARIABLE CON INFORMACION DE LOTE CONTROL
*/
  lotecontrol: any[] = [];
  /**
* DEFINICION DE VARIABLE CON INFORMACION DE ENVASE
*/
  envasecontrol: any[] = [];
  /**
* DEFINICION DE VARIABLE PARA ENVASE SELECCIONADO
*/
  selectenvase: any[] = [];
  /**
* DEFINICION DE FUNCION INIT DE LA CLASE
*/
  ngOnInit() {
    if (this.sentido === "D") {
      this.lotecontrol = this.listadoControl.filter(function (data2) {
        return data2.saldo > 0;
      });
    } else {
      this.lotecontrol = this.listadoControl.filter(function (data2) {
        return data2.saldo >= 0;
      });
    }

    this.limpiarColor();

  }
  /**
* DEFINICION DE VARIABLE DE REFERENCIA DE MODALES
*/
  modalRef: any;
  /**
* CONSTRUCTOR DE LA CLASE
*/
  constructor(private modalService: BsModalService) {
  }
  /**
* DEFINICION DE FUNCION DE CERRAR MODALES
*/
  cerrarmodal() {
    this.cierreModal.emit(true);
  }

  /**
* DEFINICION DE FUNCION DE LIMPIAR COLOR LOTE
*/
  limpiarColor() {
    for (var i = 0; i < this.lotecontrol.length; i++) {
      this.lotecontrol[i].color = "";
    }
  }
  /**
* DEFINICION DE FUNCION DE LIMPIAR COLOR ENVASE
*/
  limpiarColorenvase() {
    for (var i = 0; i < this.envasecontrol.length; i++) {
      this.envasecontrol[i].color = "";
    }
  }
  /**
* DEFINICION DE FUNCION DE CLICK EN LINEA DE GRID
*/
  clickGrid(row: any) {
    this.limpiarColor();
    row.color = "SG";
  }
  /**
* DEFINICION DE FUNCION DE DOBLE CLICK EN LINEA DE GRID
*/
  dblclickGrid(row: any) {
    this.limpiarColor();
    row.color = "SG";
  }
  /**
* DEFINICION DE FUNCION ACEPTAR 
*/
  aceptar() {
    if (this.validarControl()) {
      var _retornolote: any[] = [];
      this.lotecontrol.forEach((key) => {
        if (key.sel) {
          let _hijo = key;
          let _env = this.envasecontrol.filter(function (data2) {
            return data2.lineaMov === key.linea && data2.item === key.item && data2.lote === key.lote;
          });
          if (_env.length > 0) {
            _hijo.envases = _env;
          }
          _retornolote.push(_hijo);
        }
      });

      this.retornoGrid.emit(_retornolote);
    }
  }
  /**
* DEFINICION DE FUNCION ACEPTAR  ENVASE
*/
  aceptarenvase() {
    if (this.validarEnvaseControl()) {
      this.cancelarenvase();
    }
  }
    /**
* DEFINICION DE FUNCION DE VALIDAR INFORMACION DE LOTE
*/
  validarControl() {
    let lsLote = "";
    let rotorno = true;
    if (this.lotecontrol.length <= 0) {
      this.modalmensaje("1", "No hay lotes ingresados. Favor verifique...");
      rotorno = false;
    }
    for (var i = 0; i < this.lotecontrol.length; i++) {
      if (this.lotecontrol[i].sel) {
        lsLote = this.lotecontrol[i].lote;
        if (this.lotecontrol[i].nuevo === "S") {
          if (this.lotecontrol[i].lote === "") {
            this.modalmensaje("1", "No ha ingresado el lote para la nueva linea ingresada. Favor verifique...");
            rotorno = false;
            break;
          }
          if (this.lotecontrol[i].nom_lote === "") {
            this.modalmensaje("1", "No ha ingresado el nombre del lote " + lsLote + ". Favor verifique...");
            rotorno = false;
            break;
          }
          if (this.lotecontrol[i].fec_crea >= this.lotecontrol[i].fec_venc) {
            this.modalmensaje("1", "Las fechas de creación y caducidad deben ser diferentes o la fecha de creación menor a la de caducidad en el lote " + lsLote + ". Favor verifique...");
            rotorno = false;
            break;
          }
        }
        if (parseInt(this.lotecontrol[i].cantidad) <= 0) {
          this.modalmensaje("1", "La cantidad debe ser mayor a 0 en el lote " + lsLote + ". Favor verifique...");
          rotorno = false;
          break;
        }
      }
    }
    if (this.sentido != "A") {
      for (var i = 0; i < this.lotecontrol.length; i++) {
        if (this.lotecontrol[i].sel) {
          lsLote = this.lotecontrol[i].lote;
          if (parseFloat(this.lotecontrol[i].cantidad) > parseFloat(this.lotecontrol[i].saldo) && this.lotecontrol[i].nuevo === "N") {
            this.modalmensaje("1", "La cantidad ingresada es mayor al saldo en el lote " + lsLote + ". Favor verifique...");
            rotorno = false;
            break;
          }
        }
      }
    }
 
    return rotorno;
  }

  /**
* DEFINICION DE FUNCION DE VALIDAR INFORMACION DE ENVASE
*/
validarEnvaseControl() {
  let rotorno = true;
  for (var i = 0; i < this.envasecontrol.length; i++) {
    if (this.envasecontrol[i].envase_ini === "" || this.envasecontrol[i].envase_ini <= 0) {
      this.modalmensaje("1", "El envase inicial debe ser mayor a 0. Favor verifique...");
      rotorno = false;
      break;
    } else
      if (this.envasecontrol[i].envase_fin === "" || this.envasecontrol[i].envase_fin <= 0) {
        this.modalmensaje("1", "El envase final debe ser mayor a 0. Favor verifique...");
        rotorno = false;
        break;
      } else
        if (parseInt(this.envasecontrol[i].envase_ini) > parseInt(this.envasecontrol[i].envase_fin)) {
          this.modalmensaje("1", "El envase inical debe ser menor al envase final. Favor verifique...");
          rotorno = false;
          break;
        }
  }
  return rotorno;
  }
  /**
* DEFINICION DE FUNCION DE CLICK EN ENVASE
*/
  clickenvase(row: any) {
    if (row.envases != null && row.envases.length > 0) {
      this.envasecontrol = row.envases;
    } else {
      this.envasecontrol = [];
      let _item = this.envaselote.item;
      let _linea = this.envaselote.linea;
      let _lDet = this.envaselote.detBodega.detBodegaLote.filter(function (data2: { itcodigo: string, locodigo: string; }) {
        return data2.itcodigo === _item && data2.locodigo === row.lote;
      });

      if (_lDet !== null && _lDet.length > 0) {
        if (_lDet[0].envases.length > 0) {
          _lDet[0].envases.forEach((key: any) => {
            this.envasecontrol.push({
              lineaMov: _linea,
              item: key.itcodigo,
              lote: key.locodigo,
              linea: key.deelinea,
              envase_ini: key.deeenvaseini,
              envase_fin: key.deeenvasefin

            });
          });
        }
      }
      if (this.envasecontrol.length <= 0) {
        this.envasecontrol.push({
          lineaMov: _linea,
          item: _item,
          lote: row.lote,
          linea: 1,
          envase_ini: 0,
          envase_fin: 0
        });
      }
    }
  this.openModalStatic(this.modalloteenvase, "modal-dialog-centered modal-md modal-primary");
  }
  /**
* DEFINICION DE FUNCION DE CLICK DE GRID DE ENVASE
*/
clickGridenvase(row: any) {
  this.selectenvase = [];
  this.selectenvase.push(row);
  this.limpiarColorenvase();
  row.color = "SG";
  }
  /**
* DEFINICION DE FUNCION DE AGREGAR MAS ENVASE
*/
masenvase() {
  this.envasecontrol.push({
    lineaMov: this.envasecontrol[0].lineaMov,
    item: this.envasecontrol[0].item,
    lote: this.envasecontrol[0].lote,
    linea: this.envasecontrol.length + 1,
    envase_ini: 0,
    envase_fin: 0
  });
  }
  /**
* DEFINICION DE FUNCION DE QUITAR MAS ENVASE
*/
menosenvase() {
  if (this.selectenvase.length <= 0) {
    this.modalmensaje("1", "Debe seleccionar una fila...");
  } else
    if (this.envasecontrol.length === 1) {
      this.modalmensaje("1", "No puede eliminar la linea ya que siempre debe haber una línea para envases...");
    } else {
      for (var i = 0; i < this.envasecontrol.length; i++) {
        if (this.envasecontrol[i].linea === this.selectenvase[0].linea) {
          this.envasecontrol.splice(i, 1);
          this.selectenvase = [];
          break;
        }
      }
    }
}
/**
* DEFINICION DE FUNCION DE CANCELAR
*/
cancelar() {
  this.cerrarmodal();
}
/**
* DEFINICION DE FUNCION PARA OCULTAR MODALES
*/
hideModal() {
  if (this.modalRef != undefined) {
    this.modalRef.hide();
  }
}
/**
* DEFINICION DE FUNCION DE CANCELAR ENVASE
*/
cancelarenvase() {
  this.cierreModalenvase(true);
}
/**
* DEFINICION DE FUNCION PARA CERRAR MODALES DE ENVASE
*/
cierreModalenvase(event: boolean) {
  if (event) {
    this.hideModal()
  }
}
/**
* DEFINICION DE FUNCION PARA ABRIR CUALQUIER MODAL DE FORMA STATICO
*/
openModalStatic(content: string, tipo: string) {
  this.modalRef = this.modalService.show(
    content, { class: tipo, backdrop: 'static' });
  }
  /**
* DEFINICION DE FUNCION PARA ABRIR MODAL DE MENSAJES 
*/
  modalmensaje(tipo: string, mensaje: string) {
    this.llamarmodal = tipo + "|Lote Control|" + mensaje + "|" + Funcion.Ramdon();
  }
}
