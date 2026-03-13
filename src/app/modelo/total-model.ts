/**
* DECLARA DE CLASE DE DATOS TOTALES
*/
export class TotalModel {
  /**
* DEFINICION DE SUBTOTAL
*/
  subtotal: string;
  /**
* DEFINICION DE SUBTOTAL DESCUENTO
*/
  subtotaldescuento: string;
  /**
* DEFINICION DE SUBTOTAL RECARGOS
*/
  subtotalrecargos: string;
  /**
* DEFINICION DE SUBTOTAL EXENTO
*/
  subtotalexento: string;
  /**
* DEFINICION DE SUBTOTAL IVA
*/
  subtotaliva: string;
  /**
* DEFINICION DE IVA 1
*/
  iva1: string;
  /**
* DEFINICION DE IVA 2
*/
  iva2: string;
  /**
* DEFINICION DE IVA 3
*/
  iva3: string;
  /**
* DEFINICION DE PORCENTAJE IVA 1
*/
  poriva1: string;
  /**
* DEFINICION DE PORCENTAJE IVA 2
*/
  poriva2: string;
  /**
* DEFINICION DE PORCENTAJE IVA 3
*/
  poriva3: string;
  /**
* DEFINICION DE OPCION IVA 1
*/
  opcionimp1: string;
  /**
* DEFINICION DE OPCION IVA 2
*/
  opcionimp2: string;
  /**
* DEFINICION DE OPCION IVA 3
*/
  opcionimp3: string;
  /**
* DEFINICION DE TOTAL
*/
  total: string;

  /**
* CONSTRUCTOR DE LA CLASE
*/
  constructor() {
    this.opcionimp1 = "";
    this.opcionimp2 = "";
    this.opcionimp3 = "";
    this.subtotal = (0).toFixed(2);
    this.subtotaldescuento = (0).toFixed(2);
    this.subtotalrecargos = (0).toFixed(2);
    this.subtotalexento = (0).toFixed(2);
    this.subtotaliva = (0).toFixed(2);
    this.poriva1 = (0).toFixed(2);
    this.poriva2 = (0).toFixed(2);
    this.poriva3 = (0).toFixed(2);
    this.iva1 = (0).toFixed(2);
    this.iva2 = (0).toFixed(2);
    this.iva3 = (0).toFixed(2);
    this.total = (0).toFixed(2);

  }
}

