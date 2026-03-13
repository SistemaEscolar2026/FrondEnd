import { NgWizardConfig, NgWizardService, StepChangedArgs,   THEME } from 'ng-wizard';
import { NgWizardModule } from 'ng-wizard';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WizardModel } from '@modelo/wizard-model';
import { ModalesComponent } from '@modales/modales.component';

/**
* SESSION DONDE SE DEFINE LOS OBJETO PARA EL COMPONENTE
*/
@Component({
  standalone: true,
  selector: 'app-wizard',
  templateUrl: './wizard.component.html',
  styleUrls: ['./wizard.component.scss'],
  imports: [
    ModalesComponent,
    NgWizardModule,
    CommonModule,
    FormsModule
  ]

})
export class wizardComponent {
  /**
* DEFINICION DE VARIABLE WIZARD LA SELECCION
*/
  @Output() wzselecccionado = new EventEmitter<number>();
  /**
* DEFINICION DE MODAL DE WIZARD
*/
  @Input() set modalwizard(dato: WizardModel) {
    if (dato !==null) {
      this.model = dato
    }
  }
  /**
* DEFINICION DE EVENTO SIGUIENTE ELEMENT WIZARD
*/
  @Input() set nextstep(dato: string) {
    if (dato !== null) {
      this.showNextStep();
    }
  }
  /**
* DEFINICION DE EVENTO REGRESO ELEMENT WIZARD
*/
  @Input() set prevstep(dato: string) {
    if (dato !== null) {
      this.showPreviousStep();
    }
  }
  /**
* DEFINICION DE EVENTO RESET WIZARD
*/
  @Input() set resetstep(dato: string) {
    if (dato !== null) {
      this.resetWizard();
    }
  }
  /**
* DEFINICION DE VARIABLE DE CONFIGURACION WIZARD
*/
  config: NgWizardConfig = {
    selected: 0,
    keyNavigation: false,
    theme: THEME.arrows,
    toolbarSettings: {
      showPreviousButton: false,
      showNextButton: false
    },
    anchorSettings: { enableAllAnchors: false, markDoneStep: false }
  };
  /**
* DEFINICION DE VARIABLE QUE MODELO WIZARD
*/
  model: WizardModel = new WizardModel();
  /**
* CONSTRUCTOR DE LA CLASE
*/
  constructor( private ngWizardService: NgWizardService) {
  }
  /**
* DEFINICION DE FUNCION PARA EVENTO PREVIO WIZARD
*/
  showPreviousStep(event?: Event) {
    this.ngWizardService.previous();
  }
  /**
* DEFINICION DE FUNCION PARA EVENTO SIGUIENTE WIZARD
*/
  showNextStep(event?: Event) {
    this.ngWizardService.next();
  }
  /**
* DEFINICION DE FUNCION PARA EVENTO RESET WIZARD
*/
  resetWizard(event?: Event) {
    this.config.selected = 0;
    this.ngWizardService.reset();
    this.wzselecccionado.emit(this.config.selected);
  }
  /**
* DEFINICION DE FUNCION PARA EVENTO CAMBIO DE WIZARD
*/
  stepChanged(args: StepChangedArgs) {
      if (args.direction !== null) {
        this.config.selected = args.step.index;
        this.wzselecccionado.emit(this.config.selected);
      } else {
        this.config.selected = 0;
        this.wzselecccionado.emit(this.config.selected);
    }
  }

}
