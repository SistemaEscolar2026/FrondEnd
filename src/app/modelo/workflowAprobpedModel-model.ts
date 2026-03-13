/**
* DECLARA DE CLASE DE DATOS TRANSPORTE
*/
export class WorkflowAprobped {
  /**
* DEFINICION DE CODIGO DE COMPAÑIA
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
* DEFINICION DE TAREA
*/
  vwatarea: string;
  /**
* DEFINICION DE ORDE
*/
  vwaorden: Number;
  /**
* DEFINICION DE APROBACION
*/
  vwaaprobado: string;

  /**
* CONSTRUCTOR DE LA CLASE
*/
  constructor() {
    this.ciacodigo = "";
    this.captipo = "";
    this.capnumero = 0;
    this.vwatarea = "";
    this.vwaorden = 0;
    this.vwaaprobado = "";
  }
}
