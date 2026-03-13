import { HttpHeaders } from "@angular/common/http";

/**
* VARIABLE ESTATICA CON PARAMETRO GENERALES DE PORTAL
*/
export const environment = {
    production: false,
    API_URLLOGIN: 'http://localhost:5001',
    API_URL: 'http://localhost:5001',

    //API_URLLOGIN: 'http://194.163.176.253:9000',
    //API_URL: 'http://194.163.176.253:9000',


    //API_URLLOGIN: 'http://194.163.176.253:9001',
    //API_URL: 'http://194.163.176.253:9001',


    //API_URLLOGIN: 'http://192.168.0.89:5001',
    //API_URL: 'http://192.168.0.89:5001',

    RUTAREPORT: 'http://nucsistemas/ReportServer',

    idleTimeInMinutes: 60,
    mantenimientos: 'api/Mantenimientos/',
    reportenominames: 'api/ReporteFinMes/',
    bancos: 'api/Bancos/',
    ordenpago: 'api/OrdePago/',
    boleto: 'api/Boleto/',
    factura: 'api/Factura/',
    notacredito: 'api/NotaCredito/',
    cuentaxpagar: 'api/CuentaxPagar/',
    ordencompra: 'api/OrdenCompra/',
    reporte: 'api/Reporte/',
    reporteContabilidad: 'api/ReporteContabilidad/',
    cuentaxcobrar: 'api/CuentaxCobrar/',
    funciones: 'api/Funciones/',
    vistas: 'api/Vistas/',
    listados: 'api/AuditoriaListados/',
    procesos: 'api/AuditoriaProcesos/',
    informes: 'api/AuditoriaInformes/',
    prodControlados: 'api/ProductosControlados/',
    prodControladosFFAA: 'api/ProductosControladosFFAA/',
    contabilidad: 'api/Contabilidad/',
    inventario: 'api/Inventario/',
    cartera: 'api/Cartera/',
    ventas: 'api/Ventas/',
    solicitudCompras: 'api/SolicitudCompras/',
    operativo: 'api/Operativo/',
    comprasCxP: 'api/ComprasCxP/',
    importaciones: 'api/Importaciones/',
    informesGerencial: 'api/InformesGerencial/',
    sri: 'api/Sri/',
    produccion: 'api/Produccion/',
    planeacion: 'api/Planeacion/',
    activofijo: 'api/ActivoFijo/',
    seguridades: 'api/Seguridades/',
    nomina: 'api/Nomina/',
    facelect: 'api/FacElect/',
    general: 'api/General/',
    modMantenimientos: '01',
    modProdControlados: '03',
    modContabilidad: '04',
    modActivoFijo: '05',
    modInventario: '06',
    modVentas: '07',
    modOperativo: '08',
    modBancos: '13',
    modCartera: '09',
    modSolComp: '10',
    modCompCxP: '11',
    modImportaciones: '12',
    modSri: '15',
    modProduccion: '17',
    modPlaneacion: '18',
    modSeguridades: '02',
    modNomina: '14',
    modFacElec: '23',
    modInformesGerenciales: '24',
    modProdControladosFFAA: '25',
    reportServerMantenimientos: 'Mantenimientos/',
    reportServerContabilidad: 'Contabilidad/',
    reportServerInventario: 'Inventario/',
    reportServerVentas: 'Ventas/',
    reportServerOperativo: 'Operativo/',
    reportServerSeguridades: 'Seguridades/',
    reportServerCartera: 'Cartera/',
    reportServerCompCxP: 'ComprasCxP/',
    reportServerImportaciones: 'Importaciones/',
    reportServerBancos: 'Bancos/',
    reportServerActivoFijo: 'ActivoFijo/',
    reportServerSolComp: 'SolComp/',
    reportServerProductosControlados: 'ProductosControlados/',
    reportServerProductosControladosFFAA: 'ProductosControladosFFAA/',
    reportServerNomina: 'Nomina/',
    reportServerProduccion: 'Produccion/',
    reportServerPlaneacion: 'Planeacion/',
    reportServerSRI: 'SRI/',
    reportServerInformesGerenciales: 'InformesGerenciales/',
    FICartera: 'FI/Cartera/',
    FIBancos: 'FI/Bancos/',
    FIInventario: 'FI/Inventario/',
    FIVentas: 'FI/Ventas/',
    FIContabilidad: 'FI/Contabilidad/',
    FIActivoFijo: 'FI/ActivoFijo/',
    FICompCxP: 'FI/ComprasCxP/',
    FINomina: 'FI/Nomina/',
    FIImportacion: 'FI/Importaciones/',
    FIProduccion: 'FI/Produccion/',
    FIFacElectronica: 'FI/FacElec/',
    auxiliarClientes: '01',
    auxiliarProveedores: '02',
    ctaProveLocal: '21101001',
    ctaProveExterior: '21101002',
    ciudadCheques: 'GUAYAQUIL'
};

/**
* VARIABLE ESTATICA CON QUE ALMACENA EL TOKEN DE SESSION
*/
export const token = {
    tokenglobal: ""
}

/**
* VARIABLE ESTATICA CON QUE ALMACENA EL HEADER DE CONEXION PARA LOS METODOS API CON TOKEN
*/
export const headersglobal = {
    headers: new HttpHeaders(
        {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': 'true',
            'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type',
            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
            'Authorization': 'bearer ' + token.tokenglobal
        }
    )
};
/**
* VARIABLE ESTATICA CON QUE ALMACENA EL HEADER DE CONEXION PARA LOS METODOS API PARA GENERAR TOKEN
*/
export const headerstoken = {
    headers: new HttpHeaders(
        {
            'Content-Type': 'application/x-www-form-urlencoded',
            'No-Auth': 'True'
        }
    )
};

/**
* VARIABLE ESTATICA CON QUE ALMACENA EL HEADER DE CONEXION PARA LOS METODOS API SIN TOKEN
*/
export const headerssintoken = new HttpHeaders(
    {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
    }
);

/**
* VARIABLE ESTATICA CON QUE DATOS GENERAL DEL PORTAL
*/
export const globales = {
    cia: "",
    ipPublica: "0.0.0.0",
    sucursalPrin: "",
    ipMaquina: "1.1.1.1",
    nomMaquina: "PRUEBAS",
    complemento: " DESDE LA IP PUBLICA: ",
    auditoria: "",
    fechaModuConta: "",
    fechaModuInv: "",
    fechaModuVta: "",
    fechaModuCar: "",
    fechaModuComp: "",
    fechaModuBco: "",
    ciaRuc: "0990854092001",
    ciaDescrip: "AGEVI"
};
