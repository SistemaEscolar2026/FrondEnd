import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA, ErrorHandler } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './seguridad/login/login.component';
import { CambioClaveComponent } from './seguridad/cambioclave.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ToastrModule } from 'ngx-toastr';
import { BsModalRef, ModalModule } from 'ngx-bootstrap/modal';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgSelect2Module } from 'ng-select2';
import { GlobalErrorHandler } from '@services/config/GlobalErrorHandler';
import { ServerErrorInterceptor } from '@services/config/ServerErrorInterceptor';
import { HttpClientJsonpModule, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CompaniaComponent } from '../app/modales/compania.component';
import { BusquedaComponent } from '../app/modales/busqueda.component';
import { ReportComponent } from '@modales/report.component';
import { MasterComponent, FooterComponent } from './containers';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BoldReportDesignerModule } from '@boldreports/angular-reporting-components';
import { BoldReportViewerModule } from '@boldreports/angular-reporting-components';
import { ModalesComponent } from '@modales/modales.component';
import { OrdenCompraComponent } from '@modales/ordencompra.component';
import { SeparatorDirective } from '../environments/SeparatorDirective';
/**
* PARAMETRO ESTATICO QUE CONTIENE LA LOS NOMBRE DE COMPONETE DE LA PAGINA MAESTRA
*/
const APP_CONTAINERS = [
    FooterComponent,
    MasterComponent
];
/**
* DEFINICION DE LOS COMPONETE GENERALES E IMPORTACION DE LA REFERENCIA NECESARIA PARA EL MODULO GENERAL
*/
@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        CambioClaveComponent,
        CompaniaComponent,
        BusquedaComponent,
       // SeparatorDirective,
        ...APP_CONTAINERS
    ],
    imports: [
        OrdenCompraComponent,
        ModalesComponent,
        NgSelect2Module,
       
        ReportComponent,
        CommonModule,
        ModalModule.forRoot(),
        BoldReportDesignerModule,
        BoldReportViewerModule,
        ToastrModule.forRoot({
            timeOut: 3000,
            positionClass: 'toast-top-right',
            preventDuplicates: true,
        }),
        NgxSpinnerModule,
        MatFormFieldModule,
        MatInputModule,
        HttpClientModule,
        HttpClientJsonpModule,
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        MatTabsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatSelectModule,
        MatDialogModule,
        MatSidenavModule,
        MatMenuModule,
        MatToolbarModule,
        MatIconModule,
        MatListModule,
        RouterModule,
        MatExpansionModule,
        MatTooltipModule,
        BrowserAnimationsModule,
        FontAwesomeModule
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    providers: [
        BsModalRef,
    
        { provide: ErrorHandler, useClass: GlobalErrorHandler },
        { provide: HTTP_INTERCEPTORS, useClass: ServerErrorInterceptor, multi: true }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
