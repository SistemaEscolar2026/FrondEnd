/**
* DECLARA DE CLASE DE DATOS FORMA DE PAGO
*/
export class DetpedFpago {
  /**
* DEFINICION DE CODIGO COMPAÑIA
*/
  ciacodigo: string;
  /**
* DEFINICION DE TIPO PEDIDO
*/
  captipo: string;
  /**
* DEFINICION DE NUMERO DE PEDIDO
*/
  capnumero: number;
  /**
* DEFINICION DE CODIGO FORMA PAGO
*/
  fpcodigo: string;
  /**
* DEFINICION DE USO MODULO
*/
  fpusomodulo: string;
  /**
* DEFINICION DE FECHA DE VENCIMIENTO
*/
  dpffecvenc: string;
  /**
* DEFINICION DE TOTAL A PAGAR
*/
  dpftotalapagar: number;
  /**
* DEFINICION DE PORCENTAJE POR PRECIO
*/
  dpfporcprecio: number;
  /**
* DEFINICION DE PAGOS
*/
  fpago: string;
  /**
* CONSTRUCTOR DE LA CLASE
*/
  constructor() {
    this.ciacodigo = "";
    this.captipo = "";
    this.capnumero = 0;
    this.fpcodigo = "";
    this.fpusomodulo = "";
    this.dpffecvenc ="";
    this.dpftotalapagar = 0;
    this.dpfporcprecio = 0;
    this.fpago = "";
  }
}


