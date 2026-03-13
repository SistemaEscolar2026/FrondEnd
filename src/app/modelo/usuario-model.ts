/**
* DECLARA DE CLASE DE DATOS TRANSPORTE
*/
export class UsuarioModel {
  /**
* DEFINICION DE CODIGO DE USUARIO
*/
  uscodigo: string;
  /**
* DEFINICION DE CLAVE DE USUARIO
*/
  usclave: string;
  /**
* DEFINICION DE ID DESCRIPCION DE USUARIO
*/
  usdescrip: string;
  /**
* DEFINICION DE FECHA VIGENCIA
*/
  usfecvigen: Date;
  /**
* DEFINICION DE FECHA VIGENCIA EMICIO
*/
  usfectermi: Date;
  /**
* DEFINICION DE ESTADO
*/
  usstatus: string;
  /**
* @ignore
*/
  usdep: string;
  /**
* DEFINICION DE CARGO
*/
  uscargo: string;
  /**
* DEFINICION DE CHEQUEA NIVEL
*/
  uscheqnivel: string;
  /**
* DEFINICION DE CLAVE PROVISIONAL
*/
  usclaveprovisional: string;
  /**
* DEFINICION DE FOTO
*/
  usfoto: string;
  /**
* DEFINICION DE PERMITE MULTILOGON
*/
  usmultilogon: string;
  /**
* @ignore
*/
  usfacelect: string;
    /**
* @ignore
*/
  usproveedor: string;
  /**
* @ignore
*/
  uscliente: string;
  /**
* @ignore
*/
  usprodcont: string;
  /**
* DEFINICION DE CORREO USUARIO
*/
  uscorreo: string;
  /**
* DEFINICION DE TOKEN DE USUARIO
*/
  ustoken: string;
  /**
* @ignore
*/
  usvalor: Number;

  /**
* CONSTRUCTOR DE LA CLASE
*/
  constructor() {
    this.uscodigo = "";
    this.usdescrip = "";
    this.usclave = "";
    this.usfecvigen = new Date();
    this.usfectermi = new Date();
    this.usstatus = "";
    this.usdep = "";
    this.uscargo = "";
    this.uscheqnivel = "";
    this.usclaveprovisional = "";
    this.usfoto = "";
    this.usmultilogon = "";
    this.usfacelect = "";
    this.usproveedor = "";
    this.uscliente = "";
    this.usprodcont = "";
    this.uscorreo = "";
    this.ustoken = "";
    this.usvalor = 0;
  }
}
