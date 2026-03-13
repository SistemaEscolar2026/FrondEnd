/**
* DECLARA DE CLASE DE BOTONES
*/
export class ArchivosModel {

    linea: number;
 
    descripcion: string;
  
    nombrearchivo?: string | null;

    archivo?: string | null;
  
    /**
  * CONSTRUCTOR DE LA CLASE
  */
    constructor() {
        this.linea = 0;
        this.descripcion = "";
        this.nombrearchivo = "";
        this.archivo = "";


    }
}