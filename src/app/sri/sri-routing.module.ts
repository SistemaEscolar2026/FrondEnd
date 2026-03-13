import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SriComprasComponent } from './sricompras.component';
import { SriVentasComponent } from './sriventas.component';
import { GeneraXMLComponent } from './generaxml.component';
import {ImportacionInformacionComponent  } from './importainformacion.component';
import { ReversaInformacionComponent } from './reversainformacion.component';
import { CompraSustentoComponent } from './comprasustento.component';
import { RetencionesEfectuadasComponent } from './retencionesefectuadas.component';
import { LibroVentaClienteComponent } from './libroventacliente.component';
import { ComprassriContabilidadComponent } from './comprassricontabilidad.component';
import { ContabilidadNominaComponent } from './contabilidadnomina.component';
import { BaseComprasBaseRetencionComponent } from './basecomprasbaseretencion.component';
import { LiquidacionIvaComponent } from './liquidacioniva.component';
import { CuadraturaIvaComponent } from './cuadraturaiva.component';
import { CuadraturaComprasSriContabilidadComponent } from './cuadraturacomprasriconta.component';
import { CuadraturaVentasSriContabilidadComponent } from './cuadraturaventasriconta.component';
import { CuadraturaVentaContaFechaComponent } from './cuadraturaventacontafecha.component';
import { GastoIvaComponent } from './gastoiva.component';
import { CuadraturaRetencionesCarteraContabilidadComponent } from './cuadraturaretcarconta.component';
import { RetencionDividendosComponent } from './retenciondividendos.component';
import { SriReporteComponent } from './srireporte.component';



const routes: Routes = [
    {
        path: 'srireporte',
        component: SriReporteComponent,
        data: {
            title: 'SERVICIO DE RENTAS INTERNAS - Reporte Importacion SRI'
        }
    },
  {
    path: 'retenciondividendos',
    component: RetencionDividendosComponent,
    data: {
      title: 'SERVICIO DE RENTAS INTERNAS - Ingreso Retenciones (Dividendos)'
    }
  },
  {
    path: 'cuadraturaretcarconta',
    component: CuadraturaRetencionesCarteraContabilidadComponent,
    data: {
      title: 'SERVICIO DE RENTAS INTERNAS - Cuadratura de Retenciones Cartera - Contabilidad'
    }
  },
  {
    path: 'gastoiva',
    component: GastoIvaComponent,
    data: {
      title: 'SERVICIO DE RENTAS INTERNAS - Reporte de Gasto IVA'
    }
  },
  {
    path: 'cuadraturaventasricontafecha',
    component: CuadraturaVentaContaFechaComponent,
    data: {
      title: 'SERVICIO DE RENTAS INTERNAS - Cuadratura de Iva Ventas-Contabilidad por Fecha'
    }
  },
  {
    path: 'cuadraturaventasriconta',
    component: CuadraturaVentasSriContabilidadComponent,
    data: {
      title: 'SERVICIO DE RENTAS INTERNAS - Cuadratura de Iva en Ventas-SRI-Contabilidad'
    }
  },
  {
    path: 'cuadraturacomprasriconta',
    component: CuadraturaComprasSriContabilidadComponent,
    data: {
      title: 'SERVICIO DE RENTAS INTERNAS - Cuadratura de Retenciones de Iva Compras - Sri - Contabilidad'
    }
  },
  {
    path: 'cuadraturaiva',
    component: CuadraturaIvaComponent,
    data: {
      title: 'SERVICIO DE RENTAS INTERNAS - Cuadratura de IVA'
    }
  },
  {
    path: 'liquidacioniva',
    component: LiquidacionIvaComponent,
    data: {
      title: 'SERVICIO DE RENTAS INTERNAS - Liquidación De Iva'
    }
  },
  {
    path: 'basecomprabaseretencion',
    component: BaseComprasBaseRetencionComponent,
    data: {
      title: 'SERVICIO DE RENTAS INTERNAS - Comparativo de Base Compras y Base Retenciones por Proveedor'
    }
  },
  {
    path: 'contabilidadnomina',
    component: ContabilidadNominaComponent,
    data: {
      title: 'SERVICIO DE RENTAS INTERNAS - Comparativo Imp. Renta Contabilidad -Nómina'
    }
  },
  {
    path: 'compacomprascontabilidad',
    component: ComprassriContabilidadComponent,
    data: {
      title: 'SERVICIO DE RENTAS INTERNAS - Comparativo de Retenciones: Compras-SRI-Contabilidad'
    }
  },
  {
    path: 'libroventacliente',
    component: LibroVentaClienteComponent,
    data: {
      title: 'SERVICIO DE RENTAS INTERNAS - Libro Ventas por Cliente'
    }
  },
  {
    path: 'retencionesefectuadas',
    component: RetencionesEfectuadasComponent,
    data: {
      title: 'SERVICIO DE RENTAS INTERNAS - Informe de Retenciones Efectuadas'
    }
  },
  {
    path: 'comprasustento',
    component: CompraSustentoComponent,
    data: {
      title: 'SERVICIO DE RENTAS INTERNAS - Compras Sustento Credito Tributario'
    }
  },
  {
    path: 'reversainformacion',
    component: ReversaInformacionComponent,
    data: {
      title: 'SERVICIO DE RENTAS INTERNAS - Reverso Importación'
    }
  },
  {
    path: 'importainformacion',
    component: ImportacionInformacionComponent,
    data: {
      title: 'SERVICIO DE RENTAS INTERNAS - Importar Información'
    }
  },
  {
    path: 'generalxml',
    component: GeneraXMLComponent,
    data: {
      title: 'SERVICIO DE RENTAS INTERNAS - Generación de XML'
    }
  },
  {
    path: 'sriventas',
    component: SriVentasComponent,
    data: {
      title: 'SERVICIO DE RENTAS INTERNAS - Ingreso de Ventas SRI'
    }
  },
  {
    path: 'sricompras',
    component: SriComprasComponent,
    data: {
      title: 'SERVICIO DE RENTAS INTERNAS - Ingreso de Compras SRI'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SriRoutingModule {
}
