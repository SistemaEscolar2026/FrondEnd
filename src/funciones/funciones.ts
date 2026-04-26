import * as CryptoJS from "crypto-js";
import { menuglobal } from '../app/containers/nav';
import { HttpHeaders } from "@angular/common/http";
import * as XLSX from 'xlsx';
import { globales, environment, token, headersglobal } from 'src/environments/environment';
import * as moment from 'moment';
/**
* DECLARA DE CLASE ESTATICA PARA VALIDACIONES VARIAS
*/
export abstract class Funcion {

    /**
  * VARIABLE STATICA CON CLAVE GENERAL
  */
    static secretKey: string = "rsqGyefbSistemas";
    /**
  * VARIABLE STATICA CON LLAVE TIPO DE ALGORITMO
  */
    static clave: string = "SiReSiRe7.37hAES";
    /**
  * FUNCION QUE VALIDA EL TIPO DE IDENTIFICACION
  */
    public static ValidaCed(ced: string, tipo: string): boolean {

        return true;
    }
    public static Opciones3() {
        return [
            {
                valor: "0",
                texto: "- Escoga una Opción -"
            },
            {
                valor: "I",
                texto: "Ingresar"
            },
            {
                valor: "C",
                texto: "Consultar"
            }];
    }
    public static truncateToDecimals(num: number, dec: number) {
        const calcDec = Math.pow(10, dec);
        return Math.trunc(num * calcDec) / calcDec;
    }
    public static cloneObjeto(myObject: any) {
        const myClonedObject = Object.assign({}, myObject);
        return myClonedObject;
    }
    public static GeneraExcel(lDet: any, nombreArchivo: string) {

        try {
            /* generate worksheet */
            var ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(lDet);

            /* generate workbook and add the worksheet */
            const wb: XLSX.WorkBook = XLSX.utils.book_new();

            XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

            /*    wb.Sheets.Sheet1.A1.s = { font: { bold: true,   } };*/
            /* save to file */
            XLSX.writeFile(wb, nombreArchivo + '.xlsx');
        } catch (err) {
            console.error('export error', err);
        }
    }
    /**
  * FUNCION CARGA EXCEL
  */
    public static CargaExcel(_file: File): any {
        let fileReader = new FileReader();
        fileReader.readAsArrayBuffer(_file);
        fileReader.onload = (e) => {
            let arrayBuffer: any = fileReader.result;
            var data = new Uint8Array(arrayBuffer);
            var arr = new Array();
            for (var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
            var bstr = arr.join("");
            var workbook = XLSX.read(bstr, { type: "binary" });
            var first_sheet_name = workbook.SheetNames[0];
            var worksheet = workbook.Sheets[first_sheet_name];
            console.log(XLSX.utils.sheet_to_json(worksheet, { raw: true }));
            var arraylist: any[] = XLSX.utils.sheet_to_json(worksheet, { raw: true });
            console.log(arraylist)
            return arraylist;
        }
    }

    public static FormatoFecha2(dato: string) {
        return moment(dato).format("DD/MM/YYYY").toString()
    }
    public static cloneObjetoarray(myObject: any[]) {
        const myClonedObject = Object.assign([], myObject);
        return myClonedObject;
    }
    public static TipoEmision(): any[] {
        return [{
            valor: "F",
            texto: "FACTURA"
        },
        {
            valor: "E",
            texto: "ELECTRONICO"
        }];
    }
    public static algoritmoDigito11(ElNumero: string[]) {
        var Resultado: String = "";
        var Multiplicador: number = 2;
        var iNum: number = 0;
        var Suma: number = 0;

        for (var i = 47; i >= 0; i--) {
            iNum = parseInt(ElNumero[i].toString());
            Suma += iNum * Multiplicador;
            Multiplicador += 1;
            if (Multiplicador === 8)
                Multiplicador = 2;
        }

        Resultado = (11 - (Suma % 11)).toString();
        if (Resultado === "10")
            Resultado = "1";
        if (Resultado === "11")
            Resultado = "0";
        return Resultado;
    }
    public static Propio(): any[] {
        return [{
            valor: "S",
            texto: "SI"
        },
        {
            valor: "N",
            texto: "NO"
        }];
    }
    public static TipoIdentificacion(): any[] {
        return [{
            tidcodigo: "CI",
            tiddescripcion: "CEDULA"
        },
        {
            tidcodigo: "PA",
            tiddescripcion: "PASAPORTE"
        }];
    }
    public static TipoContrato(): any[] {
        return [{
            tconcodigo: "EV",
            nombre: "EVENTUAL"
        },
        {
            tconcodigo: "PP",
            nombre: "PERIODO PRUEBA"
        },
        {
            tconcodigo: "TP",
            nombre: "TEMPORAL"
        },
        {
            tconcodigo: "IF",
            nombre: "CONTRATO INDEFINIDO"
        }];
    }
    public static Discapacida(): any[] {
        return [{
            discodigo: "TO",
            nombre: "TOTAL"
        },
        {
            discodigo: "PA",
            nombre: "PARCIAL"
        }];
    }
    public static pantalla(): string {
        var alto: number = 0;
        alto = screen.height;
        if (alto >= 760) {
            return ((alto / 3)).toString();
        } else {
            return ((alto / 3) - 120).toString();
        }
    }
    public static pantalla2(): string {
        var alto: number = 0;
        alto = screen.height;
        if (alto >= 760) {
            return ((alto / 2)).toString();
        } else {
            return ((alto / 3) - 120).toString();
        }
    }
    public static Vivienda(): any[] {
        return [{
            valor: "P",
            texto: "PROPIA"
        },
        {
            valor: "A",
            texto: "ALQUILADA"
        }];
    }
    public static TipoEducacion(): any[] {
        return [{
            valor: "I",
            texto: "INSTRUCCION FORMAL"
        },
        {
            valor: "C",
            texto: "CURSO"
        }];
    }

    public static TipoEstadoCivil() {
        return [
            {
                valor: "S",
                texto: "SOLTERO"
            },
            {
                valor: "C",
                texto: "CASADO"
            },
            {
                valor: "V",
                texto: "VIUDO"
            },
            {
                valor: "U",
                texto: "UNION LIBRE"
            },
            {
                valor: "D",
                texto: "DIVORCIADO"
            }];
    }
    public static zeroFill(number: string, width: number) {
        width -= number.toString().length;
        if (width > 0) {
            return new Array(width + (/\./.test(number) ? 2 : 1)).join('0') + number;
        }
        return number + ""; // siempre devuelve tipo cadena
    }
    public static CargaMeses() {
        var meses: any[] = []
        for (var i = 0; i <= 12; i++) {
            let mes: any = {};

            mes.mes = i;
            mes.mesDec = i;
            switch (i) {
                case 0:
                    mes.mesD = "";
                    break;
                case 1:
                    mes.mesD = "ENERO";
                    break;
                case 2:
                    mes.mesD = "FEBRERO";
                    break;
                case 3:
                    mes.mesD = "MARZO";
                    break;
                case 4:
                    mes.mesD = "ABRIL";
                    break;
                case 5:
                    mes.mesD = "MAYO";
                    break;
                case 6:
                    mes.mesD = "JUNIO";
                    break;
                case 7:
                    mes.mesD = "JULIO";
                    break;
                case 8:
                    mes.mesD = "AGOSTO";
                    break;
                case 9:
                    mes.mesD = "SEPTIEMBRE";
                    break;
                case 10:
                    mes.mesD = "OCTUBRE";
                    break;
                case 11:
                    mes.mesD = "NOVIEMBRE";
                    break;
                case 12:
                    mes.mesD = "DICIEMBRE";
                    break;
            }

            meses.push(mes);

        }

        return meses;
    }
    public static TipoGenero() {
        return [
            {
                valor: "F",
                texto: "FEMENINO"
            },
            {
                valor: "M",
                texto: "MASCULINO"
            }];
    }
    /**
  * FUNCION DE ENCRIPTACION MD5
  */
    public static EncriptarMD5(dato: string): string {
        const hash = CryptoJS.MD5(CryptoJS.enc.Latin1.parse(dato));
        const md5 = hash.toString(CryptoJS.enc.Hex)
        return md5;
    }

    /**
  * FUNCION DE ENCRIPTACION AES
  */
    public static EncriptarAES(dato: string): string {
        var _clave = CryptoJS.enc.Utf8.parse(this.secretKey.toString());
        var _iv = CryptoJS.enc.Utf8.parse(this.clave.toString());

        return CryptoJS.AES.encrypt(dato, _clave, {
            iv: _iv
        }).toString();
    }

    /**
  * FUNCION DE DESENCRIPTACION AES
  */
    public static DesecriptarAES(dato: string): string {
        var _clave = CryptoJS.enc.Utf8.parse(this.secretKey.toString());
        var _iv = CryptoJS.enc.Utf8.parse(this.clave.toString());

        return CryptoJS.AES.decrypt(dato, _clave, {
            iv: _iv
        }).toString(CryptoJS.enc.Utf8);
    }

    /**
  * FUNCION QUE RETORNA CUALQUIER VARIABLE DE SESSION
  */
    public static returdatosession(dato: string): any {
        const _dato = sessionStorage.getItem(dato);
        if (_dato) {
            return JSON.parse(Funcion.DesecriptarAES(_dato));
        } else {
            return [];
        }
    }

    /**
  * FUNCION QUE SETEA LAS VARIABLE DE TRABAJO
  */
    public static setcambiogeneral() {
        globales.cia = "";
        token.tokenglobal = "";
        Funcion.cambiotoken();
    }

    /**
  * FUNCION QUE CAMBIA INFORMACION GENERAL A LA VARIABLE DE TRABAJO
  */
    public static esFinDeSemana(fecha: Date): boolean {
        const dia = fecha.getDay();
        // 0 = Domingo, 6 = Sábado
        return dia === 0 || dia === 6;
    }
    public static cambiogeneral() {
        globales.cia = Funcion.ReturnUsuario().co_codigo;
        token.tokenglobal = Funcion.ReturnUsuario().us_token;
        Funcion.cambiotoken();
    }
    public static  addDays(date: Date, days: number): Date {
        const result = new Date(date); // Create a copy to avoid mutating the original
        result.setDate(result.getDate() + days);
        return result;
    }

    public static calcularDias(fechaInicio: Date, fechaFin: Date): number {
        const unDia = 1000 * 60 * 60 * 24; // Milisegundos en un día
        // Convertir a UTC para asegurar precisión
        const start = Date.UTC(fechaInicio.getFullYear(), fechaInicio.getMonth(), fechaInicio.getDate());
        const end = Date.UTC(fechaFin.getFullYear(), fechaFin.getMonth(), fechaFin.getDate());

        return Math.floor((end - start) / unDia);
    }
    /**
  * FUNCION QUE CAMBIA EL TOKEN DE USUARIO EN LA VARIABLE HEADER DE CONEXION CON LOS API
  */
    public static cambiotoken() {
        headersglobal.headers = new HttpHeaders(
            {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': 'true',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
                'Authorization': 'bearer ' + token.tokenglobal
            }
        );
    }

    /**
  * FUNCION QUE ARMA Y RETORNA EL MENU DE USUARIO
  */
    public static retornamenugeneral(): any[] {
        const _datopri = sessionStorage.getItem("menupri");
        const _datosec = sessionStorage.getItem("menusec");

        if (_datopri && _datosec) {
            var datomenupri = JSON.parse(Funcion.DesecriptarAES(_datopri));
            var datomenusec = JSON.parse(Funcion.DesecriptarAES(_datosec));
            for (var i = 0; i < datomenupri.length; i++) {
                const filtro = datomenusec.filter(function (data: { mo_codigo: any; }) {
                    return data.mo_codigo === datomenupri[i].mo_codigo
                });
                const array: any[] = [];
                filtro.forEach((key: any, pe_submenu: any) => {
                    if (key.pe_submenu !== "") {
                        array.push({
                            text: key.pe_submenu,
                            icon: "",
                            nhijo: 1
                        });
                    }
                });

                datomenupri[i].nhijo = filtro.length;
                datomenupri[i].children = filtro.filter(function (data: { pe_submenu: any; }) {
                    return data.pe_submenu === ""
                });
                array.filter(
                    (recore, i, arr) => arr.findIndex(t => t.text === recore.text) === i
                ).forEach((key: any, pe_submenu: any) => {
                    datomenupri[i].children.push(key);
                });
                for (var j = 0; j < datomenupri[i].children.length; j++) {
                    datomenupri[i].children[j].children = filtro.filter(function (data: { mo_codigo: any, pe_submenu: any }) {
                        return data.mo_codigo === datomenupri[i].mo_codigo && data.pe_submenu === datomenupri[i].children[j].text
                    });
                }
            }
            return datomenupri;

        } else {
            return [];
        }
    }

    /**
  * FUNCION QUE RETORNA SI ESTA O NO AUTORIZADO EL PORTAL
  */
    public static ValidadAutorizado(): boolean {
        const _dato = sessionStorage.getItem("autoriza");
        if (_dato) {
            if (Funcion.DesecriptarAES(_dato) != "true") {
                return false;
            } else {
                return true;
            }
        } else {
            return false;
        }
    }

    /**
  * FUNCION QUE VALIDA SI TIENE PERMISO DE INGRESO A UNA PANTALLA
  */
    public static ValidadPagina(nombrePage: string): boolean {
        var _filtro = menuglobal.navItemsfilter.filter(function (data) {
            return data.text.toUpperCase().includes(nombrePage.toUpperCase())
        });

        if (_filtro.length === 0) {
            return true;
        } else {
            return true;
        }
    }

    /**
  * FUNCION QUE REMUEVE LAS VARIABLE DE SESSION
  */
    public static RemoverSession() {
        Funcion.setcambiogeneral();
        sessionStorage.clear();
        sessionStorage.setItem("autoriza", Funcion.EncriptarAES("false"));
    }

    /**
  * FUNCION QUE RETORNA EL NOMBRE DE USUARIO
  */
    public static ReturnUsuario(): any {
        var _usuario: any;
        const dato = sessionStorage.getItem('usuario')
        if (dato) {
            _usuario = JSON.parse(Funcion.DesecriptarAES(dato));
        }
        return _usuario;
    }

    /**
  * FUNCION QUE RETORNA COMPLEMENTO
  */
    public static Complemento(): string {
        return globales.complemento + globales.ipPublica + " - IP MAQUINA: " + globales.ipMaquina + " - MAQUINA: " + globales.nomMaquina;
    }

    /**
  * FUNCION QUE RETORNA NUMERO RAMDON
  */
    public static Ramdon(): number {
        return Math.floor(Math.random() * (999999 - 100000)) + 100000;
    }

    /**
  * FUNCION QUE RETORNA AUDITORIA
  */
    public static Auditoria(): string {
        var _usuario: any;
        const dato = sessionStorage.getItem('usuario')
        if (dato) {
            _usuario = JSON.parse(Funcion.DesecriptarAES(dato));
        }
        return globales.cia + "," + _usuario.us_codigo + ",";
    }
    /**
  * FUNCION PARA LLENAR COMBO DE SELECION TIPO ITEMS
  */
    public static TipoItems() {
        return [
            {
                valor: "I",
                texto: "INVENTARIO"
            },
            {
                valor: "S",
                texto: "GASTO"
            }];
    }
    /**
  * FUNCION PARA FORMATO FECHA
  */
    public static FormatoFecha(dato: string) {
        return moment(dato).format("YYYY-MM-DD").toString()
    }

    /**
  * FUNCION PARA LLENAR COMBO DE DESCUENTO RECARGO
  */
    public static TipoDescuentoRecargo() {
        return [
            {
                valor: "D",
                texto: "DESCUENTO"
            },
            {
                valor: "R",
                texto: "RECARGO"
            },
            {
                valor: "D",
                texto: "DESPACHADA"
            },
            {
                valor: "S",
                texto: "SEMIDESPACHADA"
            },
            {
                valor: "C",
                texto: "CERRADA"
            }];
    }
    public static listaColumna() {
        return [
            {
                valor: "IDENTIFICACION DE PASAJERO",
                texto: "Indentificación de pasajero"
            },
            {
                valor: "RUC AEROLINEA",
                texto: "RUC aerolínea"
            },
            {
                valor: "PERSONA SOLICITA",
                texto: "Solicitado por"
            },
            {
                valor: "SERVICIO EMISIÓN",
                texto: "Servicio de emisión"
            },
            {
                valor: "IVA SERVICIO",
                texto: "IVA - Servicio"
            },
            {
                valor: "TOTAL SERVICIOS",
                texto: "Total de servicio de emisión"
            }];
    }
    /**
  * FUNCION PARA LLENAR COMBO DE TIPO DE COMPRA
  */
    public static TipoCompra2() {
        return [
            {
                valor: "T",
                texto: "EN TRAMITE"
            },
            {
                valor: "P",
                texto: "PENDIENTE"
            },
            {
                valor: "D",
                texto: "DESPACHADA"
            },
            {
                valor: "S",
                texto: "SEMIDESPACHADA"
            },
            {
                valor: "C",
                texto: "CERRADA"
            }];
    }
    /**
  * FUNCION PARA LLENAR COMBO DE TIPO DE REFERENCIA
  */
    public static TipoReferencia() {
        return [
            {
                valor: "F",
                texto: "FACTURA"
            },
            {
                valor: "D",
                texto: "D.U.I."
            },
            {
                valor: "N",
                texto: "NOTA DE VENTA"
            },
            {
                valor: "P",
                texto: "PEDIDO"
            },
            {
                valor: "O",
                texto: "ORDEN DE COMPRA"
            },
            {
                valor: "S",
                texto: "SOLICITUD DE COMPRA"
            },
            {
                valor: "R",
                texto: "RECEPCION DE COMPRAS"
            },
            {
                valor: "X",
                texto: "OTROS"
            }];
    }
    /**
  * FUNCION PARA LLENAR COMBO DE TIPO DE ORIGEN
  */
    public static TipoOrigen() {
        return [
            {
                valor: "L",
                texto: "LOCAL"
            },
            {
                valor: "I",
                texto: "IMPORTACION"
            }];
    }
    /**
  * FUNCION PARA LLENAR COMBO DE TIPO DE COMPRA
  */
    public static TipoCompra() {
        return [
            {
                valor: "I",
                texto: "INVENTARIOS"
            },
            {
                valor: "A",
                texto: "ACTIVOS"
            }];
    }
    public static TipoDocRef() {
        return [
            {
                valor: "01",
                texto: "FACTURA"
            },
            {
                valor: "04",
                texto: "NOTA DE CRÉDITO"
            },
            {
                valor: "05",
                texto: "NOTA DE DÉBITO"
            }];
    }
    public static TipoRetencion() {
        return [
            {
                valor: "01",
                texto: "IVA"
            },
            {
                valor: "02",
                texto: "FUENTE"
            }];
    }
    public static TipoFormaPago() {
        return [
            {
                valor: "CO",
                texto: "CONTADO",
                dia: 0
            },
            {
                valor: "C1",
                texto: "CREDITO 15 DIAS",
                dia: 15
            },
            {
                valor: "C2",
                texto: "CREDITO 30 DIAS",
                dia: 30
            },
            {
                valor: "C3",
                texto: "CREDITO 45 DIAS",
                dia: 45
            },
            {
                valor: "C4",
                texto: "CREDITO 60 DIAS",
                dia: 60
            },
            {
                valor: "C5",
                texto: "CREDITO 90 DIAS",
                dia: 90
            }
        ];
    }
    /**
  * FUNCION PARA LLENAR COMBO DE SELECION GENERAL
  */
    public static Opciones() {
        return [
            {
                valor: "0",
                texto: "- Escoga una Opción -"
            },
            {
                valor: "I",
                texto: "Ingresar"
            },
            {
                valor: "C",
                texto: "Consultar"
            },
            {
                valor: "M",
                texto: "Modificar"
            }];
    }

    /**
  * FUNCION PARA LLENAR COMBO ESTADOS
  */
    public static Estado(): any[] {
        return [{
            valor: "A",
            texto: "ACTIVO"
        },
        {
            valor: "D",
            texto: "DESACTIVO"
        }];
    }
    public static TipoPeriodo(): any[] {
        return [{
            valor: "3",
            texto: "TRIMESTRAL"
        },
        {
            valor: "5",
            texto: "QUIMETRAL"
        }];
    }
    public static TipoCalses(): any[] {
        return [{
            valor: "1",
            texto: "4-1-4"
        },
        {
            valor: "2",
            texto: "3-1-2-1-3"
        }];
    }
    public static AnioElectivo(): any[] {
        var _anio: number = environment.anio;
        var _lista: any[] = [];
        for (var i = _anio; i <= environment.aniomax; i++) {
            _lista.push({
                valor: i.toString() + "-" + (i + 1).toString(),
                texto: i.toString() + "-" + (i + 1).toString()
            })
        }
        return _lista;
    }
    public static Tipo(): any[] {
        return [{
            valor: "I",
            texto: "INGRESO"
        },
        {
            valor: "E",
            texto: "EGRESO"
        }];
    }
    public static TipoFalta(): any[] {
        return [{
            valor: "P",
            texto: "POR HORA"
        },
        {
            valor: "E",
            texto: "PERMISO"
        }];
    }
    public static TipoRol(): any[] {
        return [{
            valor: "RG",
            texto: "ROL GENERAL"
        }];
    }
    public static TipoGasto(): any[] {
        return [{
            valor: "A",
            texto: "ADMINISTRATIVO"
        },
        {
            valor: "O",
            texto: "OFICINA"
        }];
    }
    public static ListTipoCuenta(): any[] {
        return [{
            valor: "G",
            texto: "GRUPO"
        },
        {
            valor: "M",
            texto: "MOVIMIENTO"
        }];
    }
    public static ListNaturaleza(): any[] {
        return [{
            valor: "A",
            texto: "ACREDORA"
        },
        {
            valor: "D",
            texto: "DEUDORA"
        }];
    }
    public static TipoDoc(): any[] {
        return [{
            valor: "AF",
            texto: "ACTIVO FIJO"
        },
        {
            valor: "GA",
            texto: "GASTO"
        },
        {
            valor: "IV",
            texto: "INVENTARIO"
        }];
    }

    public static Clase(): any[] {
        return [{
            valor: "1",
            texto: "BALANCE"
        },
        {
            valor: "2",
            texto: "INVENTARIO"
        },
        {
            valor: "3",
            texto: "ACTIVO"
        }];
    }
    public static TipoPago(): any[] {
        return [{
            valor: "E",
            texto: "EFECTIVO"
        },
        {
            valor: "D",
            texto: "DEPOSITO BANCARIO"
        },
        {
            valor: "C",
            texto: "CHEQUE"
        },
        {
            valor: "T",
            texto: "TRANSFERENCIA"
        }];
    }
    public static EstadoBoletos(): any[] {
        return [{
            valor: "1",
            texto: "ACTIVO"
        },
        {
            valor: "2",
            texto: "DESACTIVO"
        }];
    }
    public static Nacionalidad(): any[] {
        return [{
            naccodigo: "EC",
            nacnombre: "ECUATORIANO"
        },
        {
            naccodigo: "EX",
            nacnombre: "EXTRANJERO"
        }];
    }
    public static TipoViaje(): any[] {
        return [{
            valor: "NACIONAL",
            texto: "NACIONAL"
        },
        {
            valor: "INTERNACIONAL",
            texto: "INTERNACIONAL"
        }];
    }
    public static TipoComprobante(): any[] {
        return [{
            valor: "CO",
            texto: "COMPRAS"
        },
        {
            valor: "VE",
            texto: "VENTAS"
        },
        {
            valor: "IV",
            texto: "INVENTARIO"
        },
        {
            valor: "AJ",
            texto: "AJUSTE"
        }];
    }
    public static TipoForma(): any[] {
        return [{
            valor: "E",
            texto: "EFECTIVO"
        },
        {
            valor: "T",
            texto: "TRANSFERENCIA"
        },
        {
            valor: "C",
            texto: "TRAJETA CREDITO"
        }];
    }

    /**
* FUNCION PARA LLENAR COMBO TIPO CLIENTE
*/
    public static TipoCliente(): any[] {
        return [{
            valor: "N",
            texto: "NATURAL"
        },
        {
            valor: "J",
            texto: "JURIDICA"
        }];
    }
    /**
* FUNCION PARA LLENAR COMBO TIPO PROVEEDOR
*/
    public static TipoProveedor(): any[] {
        return [{
            valor: "N",
            texto: "NATURAL"
        },
        {
            valor: "J",
            texto: "JURIDICA"
        }];
    }
    /**
  * FUNCION PARA LLENAR CONDICION SI O NO
  */
    public static DatosCombo(): any[] {
        return [{
            valor: "S",
            texto: "SI"
        },
        {
            valor: "N",
            texto: "NO"
        }];
    }
    /**
  * FUNCION PARA LLENAR COMBO TIPO DE TRANSPORTE
  */
    public static DatosComboTransporte(): any[] {
        return [{
            valor: "R",
            texto: globales.ciaDescrip
        },
        {
            valor: "C",
            texto: "COOPERATIVA"
        },
        {
            valor: "P",
            texto: "PARTICULAR"
        }];
    }
    /**
  * FUNCION PARA LLENAR COMBO TIPO DE IDENTIFICACION
  */
    public static DatosComboIdenti(): any[] {
        return [{
            valor: "R",
            texto: "R.U.C."
        },
        {
            valor: "C",
            texto: "CÉDULA"
        },
        {
            valor: "P",
            texto: "PASAPORTE"
        }];
    }

    /**
  * FUNCION PARA LLENAR COMBO TIPO DE BUSQUEDA
  */
    public static OrdenBusqueda(): any[] {
        return [{
            codigo: "D",
            value: "DAU"
        },
        {
            codigo: "R",
            value: "Referendo"
        },
        {
            codigo: "C",
            value: "Contenedor"
        },
        {
            codigo: "F",
            value: "Factura Comercial"
        },
        {
            codigo: "B",
            value: "BL"
        },
        {
            codigo: "U",
            value: "Buque"
        }];
    }

    /**
  * FUNCION PARA CONVERCION DE NUMBER A UNIDADES EN LETRA
  */
    public static Unidades(num: number): string {
        switch (num) {
            case 1: return "UN";
            case 2: return "DOS";
            case 3: return "TRES";
            case 4: return "CUATRO";
            case 5: return "CINCO";
            case 6: return "SEIS";
            case 7: return "SIETE";
            case 8: return "OCHO";
            case 9: return "NUEVE";
        }
        return "";
    }
    /**
  * FUNCION PARA CONVERCION DE NUMBER A DECENAS EN LETRA
  */
    public static Decenas(num: number): string {

        var decena = Math.floor(num / 10);
        var unidad = num - (decena * 10);

        switch (decena) {
            case 1:
                switch (unidad) {
                    case 0: return "DIEZ";
                    case 1: return "ONCE";
                    case 2: return "DOCE";
                    case 3: return "TRECE";
                    case 4: return "CATORCE";
                    case 5: return "QUINCE";
                    default: return "DIECI" + Funcion.Unidades(unidad);
                }
            case 2:
                switch (unidad) {
                    case 0: return "VEINTE";
                    default: return "VEINTI" + Funcion.Unidades(unidad);
                }
            case 3: return Funcion.DecenasY("TREINTA", unidad);
            case 4: return Funcion.DecenasY("CUARENTA", unidad);
            case 5: return Funcion.DecenasY("CINCUENTA", unidad);
            case 6: return Funcion.DecenasY("SESENTA", unidad);
            case 7: return Funcion.DecenasY("SETENTA", unidad);
            case 8: return Funcion.DecenasY("OCHENTA", unidad);
            case 9: return Funcion.DecenasY("NOVENTA", unidad);
            case 0: return Funcion.Unidades(unidad);
        }
        return "";
    }

    /**
  * FUNCION PARA CONVERCION DE NUMBER A DECENASY EN LETRA
  */
    public static DecenasY(strSin: string, numUnidades: number): string {
        if (numUnidades > 0)
            return strSin + " Y " + Funcion.Unidades(numUnidades)

        return strSin;
    }

    /**
  * FUNCION PARA CONVERCION DE NUMBER A CENTENAS EN LETRA
  */
    public static Centenas(num: number): string {

        var centenas = Math.floor(num / 100);
        var decenas = num - (centenas * 100);

        switch (centenas) {
            case 1:
                if (decenas > 0)
                    return "CIENTO " + Funcion.Decenas(decenas);
                return "CIEN";
            case 2: return "DOSCIENTOS " + Funcion.Decenas(decenas);
            case 3: return "TRESCIENTOS " + Funcion.Decenas(decenas);
            case 4: return "CUATROCIENTOS " + Funcion.Decenas(decenas);
            case 5: return "QUINIENTOS " + Funcion.Decenas(decenas);
            case 6: return "SEISCIENTOS " + Funcion.Decenas(decenas);
            case 7: return "SETECIENTOS " + Funcion.Decenas(decenas);
            case 8: return "OCHOCIENTOS " + Funcion.Decenas(decenas);
            case 9: return "NOVECIENTOS " + Funcion.Decenas(decenas);
        }

        return Funcion.Decenas(decenas);
    }

    /**
  * FUNCION PARA CONVERCION DE NUMBER A SECCIONES EN LETRA
  */
    public static Seccion(num: number, divisor: number, strSingular: string, strPlural: string): string {
        var cientos = Math.floor(num / divisor)
        var resto = num - (cientos * divisor)

        var letras = "";

        if (cientos > 0)
            if (cientos > 1)
                letras = Funcion.Centenas(cientos) + " " + strPlural;
            else
                letras = strSingular;

        if (resto > 0)
            letras += "";

        return letras;
    }

    /**
  * FUNCION PARA CONVERCION DE NUMBER A MILES EN LETRA
  */
    public static Miles(num: number): string {
        var divisor = 1000;
        var cientos = Math.floor(num / divisor)
        var resto = num - (cientos * divisor)

        var strMiles = Funcion.Seccion(num, divisor, "MIL", "MIL");
        var strCentenas = Funcion.Centenas(resto);

        if (strMiles == "")
            return strCentenas;

        return strMiles + " " + strCentenas;


    }

    /**
  * FUNCION PARA CONVERCION DE NUMBER A MILLONES EN LETRA
  */
    public static Millones(num: number): string {
        var divisor = 1000000;
        var cientos = Math.floor(num / divisor)
        var resto = num - (cientos * divisor)

        var strMillones = Funcion.Seccion(num, divisor, "UN MILLON", "MILLONES");
        var strMiles = Funcion.Miles(resto);

        if (strMillones == "")
            return strMiles;

        return strMillones + " " + strMiles;

    }

    /**
  * FUNCION PARA CONVERCION DE NUMBER A LETRAS
  */
    public static NumeroALetras(num: number, centavos: boolean | null): string {
        var data = {
            numero: num,
            enteros: Math.floor(num),
            centavos: (((Math.round(num * 100)) - (Math.floor(num) * 100))),
            letrasCentavos: "",
            letrasMonedaPlural: "",
            letrasMonedaSingular: "",
        };
        if (centavos == undefined || centavos == false) {
            data.letrasMonedaPlural = "DOLARES";
            data.letrasMonedaSingular = "DOLAR";
        } else {
            data.letrasMonedaPlural = "CENTAVOS";
            data.letrasMonedaSingular = "CENTAVO";
        }

        if (data.centavos > 0)
            data.letrasCentavos = "CON " + data.centavos.toString() + "/100 " + data.letrasMonedaPlural;

        if (data.enteros == 0)
            return "CERO " + data.letrasMonedaPlural + " " + data.letrasCentavos;
        if (data.enteros == 1)
            return Funcion.Millones(data.enteros) + " " + data.letrasMonedaSingular + " " + data.letrasCentavos;
        else
            return Funcion.Millones(data.enteros) + " " + data.letrasMonedaPlural + " " + data.letrasCentavos;
    }
}

