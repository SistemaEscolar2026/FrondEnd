/**
* DECLARA DE CLASE DE DATOS DE ENTREGA
*/
export class DatospedEntrega {
  /**
* DEFINICION DE CODIGO COMPAÑIA
*/
  ciacodigo: string;
  /**
* DEFINICION DE TIPO DE PEDIDO
*/
  captipo: string;
  /**
* DEFINICION DE NUMERO PEDIDO
*/
  capnumero: Number;
  /**
* DEFINICION DE FECHA ENTREGA
*/
  vdpefechaentrega: string;
  /**
* DEFINICION DE HORA DE ENTREGA
*/
  vdpehoraentrega: string;
  /**
* DEFINICION DE TIEMPO DE LA ENTREGA
*/
  vdpetiempoentrega: Number;
  /**
* DEFINICION DE PERSONA QUE RETIRA
*/
  vdperetiramerc: string;
  /**
* DEFINICION DE OBSERVACION
*/
  vdpeobservacion: string;
  /**
* DEFINICION DE DIRECCION DE ENVIO
*/
  vdpedireccionenvio: string | null;
  /**
* DEFINICION DE TRANSPORTE DE ENVIO
*/
  vdpeenvio: string;
  /**
* CONSTRUCTOR DE LA CLASE
*/
  constructor() {
    this.ciacodigo = "";
    this.captipo = "";
    this.capnumero=0;
    this.vdpefechaentrega = "";
    this.vdpehoraentrega = "";
    this.vdpetiempoentrega=0;
    this.vdperetiramerc = "";
    this.vdpeobservacion = "";
    this.vdpedireccionenvio = null;
    this.vdpeenvio = "";
  }
}


