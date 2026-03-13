import { BdgTransportista } from "@modelo/bdgTransportista-model";
import { DatospedEntrega } from "@modelo/datospedEntrega-model";
import { DetallePed} from "@modelo/detallePed-model";
import { DetpedFpago } from "@modelo/detpedFpago-model";
import { DetpedDesrec } from "@modelo/detpedDesrecModel-model";
import { RelpedProductoc } from "@modelo/relpedProductocModel-model";
import { WorkflowAprobped } from "@modelo/workflowAprobpedModel-model";

/**
* DECLARA DE CLASE DE CABECERA DE PEDIDO
*/
export class CabeceraPed {
  /**
* DEFINICION DE VARIABLE COMPAÑIA
*/
  ciacodigo: string;
  /**
* DEFINICION DE VARIABLE TIPO PEDIDO
*/
  captipo: string;
  /**
* DEFINICION DE VARIABLE NUMERO PEDIDO
*/
  capnumero: number;
  /**
* DEFINICION DE VARIABLE FECHA PEDIDO
*/
  capfechadoc: string;
  /**
* DEFINICION DE VARIABLE SUCURSAL
*/
  sucodigo: string;
  /**
* DEFINICION DE VARIABLE CODIGO CLIENTE
*/
  clcodigo: string;
  /**
* DEFINICION DE VARIABLE CODIGO VENDEDOR
*/
  vecodigo: string;
  /**
* DEFINICION DE VARIABLE CODIGO LISTA DE PRECIO
*/
  lpcodigo: string;
  /**
* DEFINICION DE VARIABLE CODIGO TIPO DOCUMENTO
*/
  tvcodigo: string;
  /**
* DEFINICION DE VARIABLE REFERENCIA
*/
  capreferencia: string;
  /**
* DEFINICION DE CODIGO DE IMPUESTO 1
*/
  imcodigo: string | null;
  /**
* DEFINICION DE CODIGO DE IMPUESTO 2
*/
  imcodigo2: string | null;
  /**
* DEFINICION DE CODIGO DE IMPUESTO 3
*/
  imcodigo3: string | null;
  /**
* DEFINICION DE PORCENTAJE DE IMPUESTO 1
*/
  capporcimpuesto: Number;
  /**
* DEFINICION DE PORCENTAJE DE IMPUESTO 2
*/
  capporcimpuesto2: Number;
  /**
* DEFINICION DE PORCENTAJE DE IMPUESTO 3
*/
  capporcimpuesto3: Number;
  /**
* DEFINICION DE SUBTOTAL
*/
  capsubtotal: number;
  /**
* DEFINICION DE SUBTOTAL DESCUENTO
*/
  captotaldesc: Number;
  /**
* DEFINICION DE SUBTOTAL RECARGO
*/
  captotalrec: Number;
  /**
* DEFINICION DE SUBTOTAL IMPUESTO 1
*/
  captotalimp: number;
  /**
* DEFINICION DE SUBTOTAL IMPUESTO 2
*/
  captotalimp2: Number;
  /**
* DEFINICION DE SUBTOTAL IMPUESTO 3
*/
  captotalimp3: Number;
  /**
* DEFINICION DE SUBTOTAL EXENTO IVA
*/
  capexento: Number;
  /**
* DEFINICION DE ANTENCION
*/
  capatencion: string;
  /**
* DEFINICION DE OBSERVACION
*/
  capobservacion: string;
  /**
* DEFINICION DE FECHA DE SISTEMAS
*/
  capfechasistema: string;
  /**
* DEFINICION DE USUARIO
*/
  capusuario: string;
  /**
* DEFINICION DE FECHA ULTIMA MODIFICACION
*/
  capfecultmodif: string;
  /**
* DEFINICION DE USUARIO DE MODIFICACION
*/
  capusuarioultmodif: string;
  /**
* @ignore
*/
  provcodigo: string;
  /**
* @ignore
*/
  cancodigo: string;
  /**
* @ignore
*/
  parrocodigo: string;
  /**
* @ignore
*/
  paurcodigo: string;
  /**
* DEFINICION DE ESTADO DOCUMENTO
*/
  capestado: string;
  /**
* DEFINICION DE APROBACION POR VENTA
*/
  capaprobadovta: string;
  /**
* DEFINICION DE FECHA APROBACION POR VENTA
*/
  capfecaprobacionvta: string;
  /**
* DEFINICION DE USUARIO APROBACION POR VENTA
*/
  capusuarioaprobacionvta: string | null;
  /**
* DEFINICION DE APROBACION POR PRODUCTO CONTROLADO
*/
  capaprobadopc: string;
  /**
* DEFINICION DE FECHA APROBACION POR PRODUCTO CONTROLADO
*/
  capfecaprobacionpc: string;
  /**
* DEFINICION DE USUARIO APROBACION POR PRODUCTO CONTROLADO
*/
  capusuarioaprobacionpc: string | null;
  /**
* DEFINICION DE APROBACION POR CREDITO
*/
  capaprobadocre: string;
  /**
* DEFINICION DE FECHA APROBACION POR CREDITO
*/
  capfechaaprobacioncre: string;
  /**
* DEFINICION DE USUAIO APROBACION POR CREDITO
*/
  capusuarioaprobacioncre: string | null;
  /**
* DEFINICION DE PEDIDO RESERVADO
*/
  cappedreservado: string;
  /**
* DEFINICION DE FECHA PEDIDO RESERVADO
*/
  capfecreserva: string;
  /**
* DEFINICION DE USUARIO PEDIDO RESERVADO
*/
  capusuarioreserva: string | null;
  /**
* DEFINICION DE PEDIDO CERRADO
*/
  cappedcerrado: string;
  /**
* DEFINICION DE FECHA PEDIDO CERRADO
*/
  capfechapedcerrado: string;
  /**
* DEFINICION DE USUARIO PEDIDO CERRADO
*/
  capusuariopedcerrado: string | null;
  /**
* @ignore
*/
  mcpcodigo: string | null;
  /**
* DEFINICION DE REFERENCIA DE PEDIDO
*/
  capreferencia2: string;
  /**
* DEFINICION DE RETIRO DE MERCADERIA
*/
  capretiramercaderia: string;
  /**
* DEFINICION DE CODIGO FORMA DE PAGO
*/
  fpscodigo: string | null;
  /**
* @ignore
*/
  captipooriginal: string;
  /**
* @ignore
*/
  capnumerooriginal: Number;
  /**
* DEFINICION DE FECHA VENCIMIENTO DE CREDITO
*/
  capfechavencres: string | null;
  /**
* DEFINICION DE PERSONA QUE AUTORIZA
*/
  cappersonasautori: string;
  /**
* DEFINICION DE APROBACION PEDIDO FFAA
*/
  capaprobadopfa: string;
  /**
* DEFINICION DE FECHA APROBACION PEDIDO FFAA
*/
  capfecaprobacionpfa: string;
  /**
* DEFINICION DE USUARIO APROBACION PEDIDO FFAA
*/
  capusuarioaprobacionpfa: string;
  /**
* @ignore
*/
  clnombre: string;
  /**
* @ignore
*/
  aproreserva: string;
  /**
* @ignore
*/
  iCliExento: string;
  /**
* DEFINICION DE TRANSPORTISTA
*/
  bdgTransportista: BdgTransportista;
  /**
* DEFINICION DE DATOS PEDIDO ENTREGA
*/
  datospedEntrega: DatospedEntrega;
  /**
* DEFINICION DE DETALLE DE PEDIDO
*/
  detallePed: DetallePed[];
  /**
* DEFINICION DE DETALLE FORMA DE PAGO
*/
  detpedFpago: DetpedFpago[];
  /**
* DEFINICION DE PRODUCTO RESERVADO
*/
  detpedDesrec: DetpedDesrec[];
  /**
* DEFINICION DE PRODUCTO CONTROLADO
*/
  relpedProductoc: RelpedProductoc[];
  /**
* DEFINICION DE WORKFLOW DE APROBACION DE PEDIDO
*/
  workflowAprobped: WorkflowAprobped[];

  /**
* CONSTRUCTOR DE LA CLASE
*/
  constructor() {
    this.iCliExento = "";
    this.ciacodigo = "";
    this.captipo = "";
    this.capnumero = 0;
    this.capfechadoc = "";
    this.sucodigo = "";
    this.clcodigo = "";
    this.vecodigo = "";
    this.lpcodigo = "";
    this.tvcodigo = "";
    this.capreferencia = "";
    this.imcodigo = "";
    this.imcodigo2 = "";
    this.imcodigo3 = "";
    this.capporcimpuesto = 0;
    this.capporcimpuesto2 = 0;
    this.capporcimpuesto3 = 0;
    this.capsubtotal = 0;
    this.captotaldesc = 0;
    this.captotalrec = 0;
    this.captotalimp = 0;
    this.captotalimp2 = 0;
    this.captotalimp3 = 0;
    this.capexento = 0;
    this.capatencion = "";
    this.capobservacion = "";
    this.capfechasistema = "";
    this.capusuario = "";
    this.capfecultmodif = "";
    this.capusuarioultmodif = "";
    this.provcodigo = "";
    this.cancodigo = "";
    this.parrocodigo = "";
    this.paurcodigo = "";
    this.capestado = "";
    this.capaprobadovta = "";
    this.capfecaprobacionvta = "";
    this.capusuarioaprobacionvta = null;
    this.capaprobadopc = "";
    this.capfecaprobacionpc = "";
    this.capusuarioaprobacionpc = null;
    this.capaprobadocre = "";
    this.capfechaaprobacioncre = "";
    this.capusuarioaprobacioncre = null;
    this.cappedreservado = "";
    this.capfecreserva = "";
    this.capusuarioreserva = null;
    this.cappedcerrado = "";
    this.capfechapedcerrado = "";
    this.capusuariopedcerrado = null;
    this.mcpcodigo = null;
    this.capreferencia2 = "";
    this.capretiramercaderia = "";
    this.fpscodigo =null;
    this.captipooriginal = "";
    this.capnumerooriginal = 0;
    this.capfechavencres = "";
    this.cappersonasautori = "";
    this.capaprobadopfa = "";
    this.capfecaprobacionpfa = "";
    this.capusuarioaprobacionpfa = "";
    this.clnombre = "";
    this.aproreserva = "";
    this.bdgTransportista = new BdgTransportista();
    this.datospedEntrega = new DatospedEntrega();
    this.detallePed = [];
    this.detpedFpago = [];
    this.detpedDesrec = [];
    this.relpedProductoc = [];
    this.workflowAprobped = [];

  }
}

