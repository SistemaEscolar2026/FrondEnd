export class BoSeguroModel {
    sec: number;
    bs_codigo: number;
    bc_codigo: number;
    ts_codigo: number;
    ts_codigodesc: string;
    bs_valor_seguro: number;
    bs_observacion:string
    bs_estado: string;
    color: string;
    constructor() {
        this.sec = 0;
        this.bs_codigo = 0;
        this.bc_codigo = 0;
        this.ts_codigo = 0;
        this.bs_valor_seguro = 0;
        this.ts_codigodesc = "";
        this.bs_observacion = "";
        this.bs_estado = "";
        this.color = "";
    }
}