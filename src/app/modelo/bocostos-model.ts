import { BoCostoProveedorModel } from "./bocostoproveedor-model";

export class BoCostosModel {
    boc_codigo: number;
    bd_codigo: number;
    boc_costo_total: number;
    boc_otro_costo: number;
    boc_costo_boleto: number;
    boc_costo_fee: number;
    boc_costo_seguro: number;
    boc_nacional_internacional: string;
    boc_num_reserva: string;
    fp_codigo: number;
    ds_forma: string;
    boc_num_tarjeta_credito: string;
    boc_referencia: string;
    boc_num_recibo: string;
    boc_num_autorizacion: string;
    boc_observacion: string;
    sa_codigo: number;
    boc_valor_adicional: number;
    costo_proveedor: BoCostoProveedorModel;
    constructor() {
        this.sa_codigo = 0;
        this.boc_valor_adicional = 0;
        this.boc_codigo = 0;
        this.bd_codigo = 0;
        this.boc_costo_total = 0;
        this.boc_otro_costo = 0;
        this.boc_costo_boleto = 0;
        this.boc_costo_fee = 0;
        this.boc_costo_seguro = 0;
        this.boc_nacional_internacional = "";
        this.boc_num_reserva = "";
        this.fp_codigo = 0;
        this.ds_forma = "";
        this.boc_num_tarjeta_credito = "";
        this.boc_referencia = "";
        this.boc_num_recibo = "";
        this.boc_num_autorizacion = "";
        this.boc_observacion = "";
        this.costo_proveedor = new BoCostoProveedorModel();
    }
}