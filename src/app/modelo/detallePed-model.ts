/**
* DECLARA DE CLASE DE DATOS DETALLE DE PEIDO
*/
export class DetallePed {
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
  capnumero: string;
  /**
* DEFINICION DE LINEA DE DETALLE
*/
  deplinea: Number;
  /**
* DEFINICION DE CODIGO BODEGA
*/
  bocodigo: string;
  /**
* DEFINICION DE CODIGO ITEM
*/
  itcodigo: string;
  /**
* DEFINICION DE CODIGO UNIDAD DE MEDIDA
*/
  mecodigo: string;
  /**
* DEFINICION DE FACTOR
*/
  depfactor: Number;
  /**
* DEFINICION DE PRECIO DE LISTA
*/
  deppreclista: Number;
  /**
* DEFINICION DE PRECIO FORMA DE PAGO
*/
  depprecfpago: Number;
  /**
* DEFINICION DE CANTIDAD
*/
  depcantped: Number;
  /**
* DEFINICION DE PRECIO
*/
  depprecio: Number;
  /**
* DEFINICION DE CANITDAD DE KILO
*/
  depcantmedalter: number;
  /**
* DEFINICION DE PRECIO POR KILO
*/
  deppreciomedalter: Number;
  /**
* DEFINICION DE CANTIDAD DESCUENTO
*/
  depcantdes: Number;
  /**
* DEFINICION DE IVA
*/
  depiva: string;
  /**
* DEFINICION DE PORCENTAJE DE IVA
*/
  depporiva: Number;
  /**
* DEFINICION DE LLEVA IVA
*/
  depivalin: Number;
  /**
* DEFINICION DE DESCRIPCION ITEM
*/
  itdescripcion: string;
  /**
* DEFINICION DE LOTE
*/
  itlote: string;
  /**
* @ignore
*/
  itexento: string;
  /**
* @ignore
*/
  clexento: string;
  /**
* DEFINICION DE PERMITE PRECIO 0
*/
  itpermitepreciocerovta: string;
  /**
* DEFINICION DE SALDO
*/
  saldo: Number;
  /**
* @ignore
*/
  cantLib: Number;
  /**
* @ignore
*/
  total: number;
  /**
* @ignore
*/
  control: string;
  /**
* @ignore
*/
  prccodigo: string;
  /**
* @ignore
*/
  pfacodigo: string;
  /**
* CONSTRUCTOR DE LA CLASE
*/
  constructor() {
    this.ciacodigo = "";
    this.captipo = "";
    this.capnumero = "";
    this.deplinea= 0;
    this.bocodigo = "";
    this.itcodigo = "";
    this.mecodigo = "";
    this.depfactor = 0;
    this.deppreclista = 0;
    this.depprecfpago = 0;
    this.depcantped = 0;
    this.depprecio = 0;
    this.depcantmedalter = 0;
    this.deppreciomedalter = 0;
    this.depcantdes = 0;
    this.depiva = "";
    this.depporiva = 0;
    this.depivalin = 0;
    this.itdescripcion = "";
    this.itlote = "";
    this.itexento = "";
    this.clexento = "";
    this.itpermitepreciocerovta = "";
    this.saldo = 0;
    this.cantLib = 0;
    this.total = 0;
    this.control = "";
    this.prccodigo = "";
    this.pfacodigo = "";
  }
}
