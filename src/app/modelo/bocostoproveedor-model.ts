export class BoCostoProveedorModel {
    bcp_codigo: number;
    boc_codigo: number;
    pr_codigo: number;
    pr_codigodesc: string;
    bcp_estado: string;
    constructor() {
        this.bcp_codigo = 0;
        this.boc_codigo = 0;
        this.pr_codigo = 0;
        this.pr_codigodesc = "";
        this.bcp_estado = "";
    }
}