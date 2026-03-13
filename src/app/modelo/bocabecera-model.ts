import { BoAlojamientoModel } from "./boalojamiento-model";

import { BoDetalleModel } from "./bodetalle-model";
import { BoSeguroModel } from "./boseguro-model";

export class BoCabeceraModel {
    bc_codigo: number;
    cl_codigo: number;
    co_codigo: string;
    cl_nombre: string;
    bc_nombre_pasajero: string;
    bc_identificacion_pasajero: string;
    rut_codigo: number;
    rut_discripcion: string;
    bc_fecha_pedido: string;
    bc_fecha_inicio_viaje: string;
    bc_fecha_fin_viaje: string;
    bc_persona_solicita: string;
    bc_valor_boleto: number;
    bc_valor_impuesto: number;
    bc_fee: string;
    tipoboleto: string;
    bc_iva_fee: number;
    bc_total_boleto_fee: number;
    bc_estado_boleto: number;
    bc_boleto_cambio: string;
    ae_codigo: number;
    fp_codigo: number;
    fp_nombre: string;
    bc_tipo_viaje: string;
    us_codigo: string;
    bc_redondeo: string;
    bc_escala: boolean;
    detalle_bo: BoDetalleModel[];
    constructor() {
        this.bc_codigo = 0;
        this.cl_codigo = 0;
        this.co_codigo = "";
        this.cl_nombre = "";
        this.fp_codigo = 0;
        this.bc_boleto_cambio = "";
        this.fp_nombre = "";
        this.bc_redondeo = "";
        this.bc_nombre_pasajero = "";
        this.bc_identificacion_pasajero = "";
        this.rut_codigo = 0;
        this.rut_discripcion = "";
        this.bc_fecha_pedido = "";
        this.tipoboleto = "";
        this.bc_fecha_inicio_viaje = "";
        this.bc_fecha_fin_viaje = "";
        this.bc_persona_solicita = "";
        this.bc_valor_boleto = 0;
        this.bc_valor_impuesto = 0;
        this.bc_fee = "0.00";
        this.bc_iva_fee = 0;
        this.bc_total_boleto_fee = 0;
        this.bc_estado_boleto = 0;
        this.ae_codigo = 0;
        this.bc_escala = false;
        this.detalle_bo = [];
        this.bc_tipo_viaje = "";
        this.us_codigo = "";
    }
}