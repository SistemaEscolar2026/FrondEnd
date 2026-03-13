import { BoCostosModel } from "./bocostos-model";
export class BoDetalleModel {
    sec: number;
    bd_iva: boolean
    bd_codigo: number;
    bc_codigo: number;
    bd_ticket: string;
    bd_valor_ticket: number;
    bd_valor_iva: number;
    bd_otro_impuesto: number;
    bd_total_boleto: number;
    bd_valor_servicio: number;
    bd_iva_servicio: number;
    bd_total_servicio: number;
    bd_total_general: number;
    bd_estado: string;
    color: string;
    costos_bo: BoCostosModel;
    constructor() {
        this.sec = 0;
        this.bd_iva = true;
        this.bd_codigo = 0;
        this.bc_codigo = 0;
        this.bd_ticket = "";
        this.bd_valor_ticket = 0;
        this.bd_valor_iva = 0;
        this.bd_otro_impuesto = 0;
        this.bd_total_boleto = 0;
        this.bd_valor_servicio = 0;
        this.bd_iva_servicio = 0;
        this.bd_total_servicio = 0;
        this.bd_total_general = 0;
        this.bd_estado = "";
        this.color = "";
        this.costos_bo = new BoCostosModel();
    }
}