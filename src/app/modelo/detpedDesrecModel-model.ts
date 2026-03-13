/**
* DECLARA DE CLASE DE DATOS RESERVA
*/
export class DetpedDesrec {
  /**
* DEFINICION DE CODIGO COMPAÑIA
*/
  ciacodigo: string;
  /**
* DEFINICION DE TIPO PEDIDO
*/
  captipo: string;
  /**
* DEFINICION DE NUMERO PEDIDO
*/
  capnumero: Number;
  /**
* DEFINICION DE LINEA PEDIDO RESERVADO
*/
  dpdrlinea: Number;
  /**
* DEFINICION DE TIPO RESERVA
*/
  drtipodesrec: string;
  /**
* DEFINICION DE CODIGO
*/
  drcodigo: string;
  /**
* DEFINICION DE VALOR RESERVA
*/
  dpdrvalordesrec: Number;
  /**
* DEFINICION DE TOTAL DE RESERVA
*/
  dpdrtotaldesrec: Number;
  /**
* CONSTRUCTOR DE LA CLASE
*/
  constructor() {
    this.ciacodigo = "";
    this.captipo = "";
    this.capnumero = 0;
    this.dpdrlinea = 0;
    this.drtipodesrec = "";
    this.drcodigo = "";
    this.dpdrvalordesrec = 0;
    this.dpdrtotaldesrec = 0;
  }
}
