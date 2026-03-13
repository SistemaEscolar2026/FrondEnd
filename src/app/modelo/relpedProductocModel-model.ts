/**
* DECLARA DE CLASE DE DATOS PROVINCIA
*/
export class RelpedProductoc {
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
  capnumero: Number;
  /**
* DEFINICION DE CODIGO CLIENTE
*/
  clcodigo: string;
  /**
* DEFINICION DE GRUPO PRODUCTO CONTROLADO
*/
  tccodigo: string;
  /**
* DEFINICION DE NUMERO PRODUCTO CONTROLADO
*/
  pccnumero: Number;
  /**
* DEFINICION DE COD PRODUCTO CONTROLADO
*/
  prccodigo: string;
  /**
* DEFINICION DE CANTIDAD PRODUCTO CONTROLADO
*/
  rppcantidad: number;
  /**
* DEFINICION DE NUMERO DE CALIFICACION DE PRODUCTO CONTROLADO
*/
  rppnumcalificacion: string;

  /**
* CONSTRUCTOR DE LA CLASE
*/
  constructor() {
    this.ciacodigo = "";
    this.captipo = "";
    this.capnumero = 0;
    this.clcodigo = "";
    this.tccodigo = "";
    this.pccnumero = 0;
    this.prccodigo = "";
    this.rppcantidad = 0;
    this.rppnumcalificacion = "";
  }
}
