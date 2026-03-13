/**
* DECLARA DE CLASE DE DATOS TRANSPORTE
*/
export class VendedorModel {
  /**
* DEFINICION DE CODIGO DE COMPAÑIA
*/
  ciacodigo: string;
  /**
* DEFINICION DE CODIGO DE VENDEDOR
*/
  vecodigo: string;
  /**
* DEFINICION DE NOMBRE DE VENDEDIR
*/
  venombre: string;
  /**
* @ignore
*/
  provcodigo: string;
  /**
* @ignore
*/
  cancodigo?: string | null = null;
  /**
* DEFINICION DE ESTADO
*/
  veestado: string;
  /**
* DEFINICION DE TELEFONO
*/
  vefonocel: string;
  /**
* DEFINICION DE CORREO
*/
  vemail: string;

  /**
* CONSTRUCTOR DE LA CLASE
*/
  constructor() {
    this.ciacodigo = "";
    this.vecodigo = "";
    this.venombre = "";
    this.provcodigo = "";
    this.cancodigo = null ;
    this.veestado = "";
    this.vefonocel = "";
    this.vemail = "";
  }
}

