import { Component } from '@angular/core';

/**
* SESSION DONDE SE DEFINE LOS OBJETO PARA EL COMPONENTE
*/
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})

export class FooterComponent  {
  /**
* VARIABLE DE AÑO PARA LA SESSION FOOTER DEL PORTAL
*/
  anio: string = "";

  /**
* CONSTRUCTOR DE LA CLASE
*/
  constructor() {
    this.anio = (new Date().getFullYear().toString())
  }
}
