export class BoAlojamientoModel {
    sec: number;
    ba_codigo: number;
    bc_codigo: number;
    ta_codigo: number;
    ta_codigodesc: string;
    ba_valor: number;
    ba_observacion: string
    ba_estado: string;
    color: string = "";
    constructor() {
        this.sec = 0;
        this.ba_codigo = 0;
        this.bc_codigo = 0;
        this.ta_codigo = 0;
        this.ta_codigodesc = "";
        this.ba_valor = 0;
        this.ba_observacion = "";
        this.ba_estado = "";
        this.color = "";
    }
}