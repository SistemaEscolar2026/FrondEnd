import { Component, AfterViewInit, Inject, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Funcion } from '@funciones/funciones';
import { Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ServicePerfil } from '../service/ServicePerfil';
@Component({
    templateUrl: 'mantPerfilPagina.component.html',
    styleUrls: ['./mantPerfilPagina.component.scss']
})

export class MantPerfilPaginaComponent implements AfterViewInit {
    ngAfterViewInit(): void {

    }

    public mensaje: string = "";
    okmodal() {
    }

    confirmacionmodal() {
    }
    dangermodal() {
    }

    infomodal() {
    }
    //fin seccion de modales


    public modelo: any = {};
    public modelPPagina:any= {};
    router: Router;
    public loading = false;
    public p: number = 1;
    public labelBoton: string = "";
    public isDisabled: boolean = false;
    public perfilPagina: any = [];
    public listaDesde: any = [];
    public listaHasta: any = [];
    public select_desde: string = "";
    public select_hasta: string = "";
    constructor(private cdRef: ChangeDetectorRef, _router: Router, private servicioPerfil: ServicePerfil) {
        this.modelo = {};
        this.modelPPagina = {};
        this.router = _router;
        if (!Funcion.ValidadAutorizado()) {
            this.router.navigate(['/']);
        } else {
            if (!Funcion.ValidadPagina('Ingreso de Perfil')) {
                this.router.navigate(['/principal/default'], {
                    skipLocationChange: true,
                });
            }
        }


    }

    okActualizacion(): any {
        this.regresar();
    }

    pasar(): any {
        if (this.select_desde != "") {
            var _itemDesde = this.listaDesde;
            for (var i = 0; i <= _itemDesde.length; i++) {
                if (_itemDesde[i].codigo == this.select_desde) {
                    var item = {
                        codigo: _itemDesde[i].codigo,
                        descripcion: _itemDesde[i].descripcion
                    };
                    this.listaHasta.push(item);
                    this.listaDesde.splice(i, 1);
                    break;
                }
            }

        }
    }

    devolver(): any {
        if (this.select_hasta != "") {
            var _itemHasta = this.listaHasta;
            for (var i = 0; i <= _itemHasta.length; i++) {
                if (_itemHasta[i].codigo == this.select_hasta) {
                    var item = {
                        codigo: _itemHasta[i].codigo,
                        descripcion: _itemHasta[i].descripcion
                    };
                    this.listaDesde.push(item);
                    this.listaHasta.splice(i, 1);
                    break;
                }
            }

        }
    }

    validacionFormulario(): any {
        if (this.modelPPagina.cod_Perfil == "") {
            this.mensaje = "Por favor debe ingresar el codigo del perfil.";
            return false;
        }

        return true;
    }

    aceptarConfirmacion(): any {
        this.loading = true;
        var _itemHasta = this.listaHasta;
        for (var i = 0; i <= _itemHasta.length - 1; i++) {
            if (this.modelPPagina.cod_Hasta == "") {
                this.modelPPagina.cod_Hasta = _itemHasta[i].codigo;
            } else {
                this.modelPPagina.cod_Hasta = this.modelPPagina.cod_Hasta + "|" + _itemHasta[i].codigo;
            }
        }

        this.servicioPerfil.getActualizarPerfilPagina(this.modelPPagina).subscribe((results) => {
            try {
                if (results.codError.toString() === "0") {
                    this.loading = false;
                    this.mensaje = results.msgError.toString();
                     this.regresar();
                } else {
                    this.loading = false;
                    this.mensaje = results.msgError.toString();
          
                }
            } catch (e) {
                this.loading = false;
            }
        }, err => {
            this.loading = false;
        });
    }

    limpiar() {
        this.modelPPagina.cod_Perfil = "";
        this.modelPPagina.cod_Hasta = "";
        this.isDisabled = false;
        this.listaDesde = [];
        this.listaHasta = [];
        this.llenarPaginaPefil("0", '');
    }


    isCollapsed: boolean = false;
    iconCollapse: string = 'icon-arrow-up';

    collapsed(event: any): void {
        // console.log(event);
    }

    expanded(event: any): void {
        // console.log(event);
    }

    toggleCollapse(): void {
        this.isCollapsed = !this.isCollapsed;
        this.iconCollapse = this.isCollapsed ? 'icon-arrow-down' : 'icon-arrow-up';
    }

    regresar() {
        this.router.navigate(['/seguridad/perfilPagina']);
    }

    nuevoPerfil() {
        this.limpiar();
    }

    actualizarPerfil() {
        if (this.validacionFormulario()) {
            if (true) {
                this.mensaje = "Esta Seguro de Actualizar el perfil Pagina";
            } else {
                this.mensaje = "Esta Seguro de Guardar el perfil Pagina";
            }
            this.confirmacionmodal();
        } else {
            
        }

    }





    llenarPaginaPefil(cod_perfil: string, tipo_pagina: string): any {
        var modelP:any = {};
        modelP.cod_Perfil = cod_perfil;
        modelP.tipo_Pagina = tipo_pagina;
        if (true) {
            this.loading = true;
            this.servicioPerfil.getConsultaPaginaPerfil(modelP).subscribe((results) => {
                try {
                    if (results.codError.toString() === "0") {
                        sessionStorage.setItem("PaginaDesde", results.root[0]);
                        sessionStorage.setItem("PaginaHasta", results.root[1]);
                        for (var i = 0; i < results.root[0].length; i++) {
                            var item = {
                                codigo: results.root[0][i].codigo,
                                descripcion: results.root[0][i].descripcion
                            };
                            this.listaDesde.push(item);
                        }
                        for (var i = 0; i < results.root[1].length; i++) {
                            var item = {
                                codigo: results.root[1][i].codigo,
                                descripcion: results.root[1][i].descripcion
                            };
                            this.listaHasta.push(item);
                        }
                        this.loading = false;
                    } else {
                        this.loading = false;
                        this.mensaje = results.msgError.toString();
                 
                    }
                } catch (e) {
                    this.loading = false;
                }
            }, err => {
                this.loading = false;
            });
        }

    }

    seleciona(codigo: string) {
        this.listaDesde = [];
        this.listaHasta = [];
        for (var i = 0; i < this.perfilPagina.length; i++) {
            if (codigo == this.perfilPagina[i].codigo) {
                this.llenarPaginaPefil("0", this.perfilPagina[i].tipoperfil);
                break;
            }
        }

    }

    consultaPerfilPagina(): any {
        if (true) {
            this.loading = true;
            this.servicioPerfil.getConsultaPerfilPagina(this.modelo).subscribe((results) => {
                try {
                    if (results.codError.toString() === "0") {
                        this.perfilPagina = [];
                        for (var i = 0; i < results.root[0].length; i++) {
                            var item = {
                                codigo: results.root[0][i].codigo_pus,
                                descripcion: results.root[0][i].nombre_pus,
                                tipoperfil: results.root[0][i].tipoperfil_pus
                            };
                            this.perfilPagina.push(item);
                        }
                        this.loading = false;
                    } else {
                        this.loading = false;
                        this.mensaje = results.msgError.toString();
            
                    }
                } catch (e) {
                    this.loading = false;
                }
            }, err => {
                this.loading = false;
            });
        }

    }

    consultaTotalPerfil(): any {
        if (true) {
            this.loading = true;
            this.servicioPerfil.getConsultaPerfilTipo(this.modelo).subscribe((results) => {
                try {
                    if (results.codError.toString() === "0") {
                        this.perfilPagina = [];
                        for (var i = 0; i < results.root[0].length; i++) {
                            var item = {
                                codigo: results.root[0][i].codigo_pus,
                                descripcion: results.root[0][i].nombre_pus
                            };
                            this.perfilPagina.push(item);
                        }
                        this.loading = false;
                    } else {
                        this.loading = false;
                        this.mensaje = results.msgError.toString();
                  
                    }
                } catch (e) {
                    this.loading = false;
                }
            }, err => {
                this.loading = false;
            });
        }

    }
    //Mensajes Acción
    Toast = {};
}
