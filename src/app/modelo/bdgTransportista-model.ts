import { TransporteProd } from "@modelo/transporteProd-model";
import { ConductorCalificados } from "@modelo/conductorCalificados-model";

/**
* DECLARA DE FUNCION DE TRANSPORTISTA
*/
export class BdgTransportista {
  /**
* DEFINICION DE VARIABLE CODIGO DE COMPAÑIA
*/
  ciacodigo: string;
  /**
* DEFINICION DE VARIABLE TIPO DE ORDEN DE VENTA
*/
  captipo: string;
  /**
* DEFINICION DE VARIABLE TIPO DE NUMERO DE ORDEN DE VENTA
*/
  capnumero: Number;
  /**
* DEFINICION DE VARIABLE ID DE TRANSPORTISTA
*/
  tridtransportes: number|null;
  /**
* DEFINICION DE VARIABLE TIPO DE TRANSPORTISTA
*/
  btrtipotrans: string;
  /**
* DEFINICION DE VARIABLE TIPO DE INDENTIFICACION
*/
  btrtipoid: string;
  /**
* DEFINICION DE VARIABLE RUC DE TRANASPORTISTA
*/
  btrructrans: string;
  /**
* DEFINICION DE VARIABLE NOMBRE DE TRANSPORTISTA
*/
  btrnomtrans: string;
  /**
* DEFINICION DE VARIABLE PLACA DE VEHICULO
*/
  btrplaca: string;
  /**
* DEFINICION DE VARIABLE PLACA DE TRASNPORTE
*/
  vqplaca: string | null;
  /**
* DEFINICION DE VARIABLE SUCURSAL
*/
  sucodigo: string | null;
  /**
* @ignore
*/
  btrconductor: string;
  /**
* @ignore
*/
  cccodigo: string;
  /**
* @ignore
*/
  muestraconductor: string;
  /**
* DEFINICION DE VARIABLE TRANSPORTISTA
*/
  transporteProd: TransporteProd;
  /**
* DEFINICION DE VARIABLE DE CONDUCTOR CALIFICADO
*/
  ConductorCalificados: ConductorCalificados;

  /**
* CONSTRUCTOR DE LA CLASE
*/
  constructor() {
    this.ciacodigo = "";
    this.captipo = "";
    this.capnumero = 0;
    this.tridtransportes = 0;
    this.btrtipotrans = "";
    this.btrtipoid = "";
    this.btrructrans = "";
    this.btrnomtrans = "";
    this.btrplaca = "";
    this.vqplaca = "";
    this.sucodigo = "";
    this.btrconductor = "";
    this.cccodigo = "";
    this.muestraconductor = "";
    this.transporteProd = new TransporteProd();
    this.ConductorCalificados = new ConductorCalificados();
  }
}



