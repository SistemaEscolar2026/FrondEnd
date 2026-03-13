export class DetallePago {
    sec: number;
    seccab: number;
    cc_codigo: number;
    tipo_pago: string;
    valor_efectivo: string;
    num_deposito: string;
    valor_deposito: string;
    num_cheque: string;
    valor_cheque: string;
    num_transferencia: string;
    valor_transferencia: string;
    total: number;
    usuario: string;
    color: string;
    constructor() {
        this.sec = 0;
        this.cc_codigo = 0;
        this.seccab = 0;
        this.tipo_pago = "";
        this.valor_efectivo = "";
        this.num_deposito = "";
        this.valor_deposito = "";
        this.num_cheque = "";
        this.valor_cheque = "";
        this.num_transferencia = "";
        this.usuario = "";
        this.valor_transferencia = "";
        this.total = 0;
        this.color = "";
    }
}

