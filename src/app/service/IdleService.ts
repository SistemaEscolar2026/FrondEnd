import { Injectable } from '@angular/core';
import { Observable, fromEvent, merge, Subject, timer, Subscription } from 'rxjs';

/**
* CLASE TIPO SERVICE QUE CONTROLA LA CADUCIDAD DE SESSION
*/
@Injectable({
  providedIn: 'root'
})
export class IdleService {
  /**
* DEFINICION DE VARIABLE QUE CONTROL EL MOVIMIENTO DEL MOUSE
*/
  private idle: Observable<any> = new Observable();
  /**
* DEFINICION DE VARIABLE TIPO TIMER 
*/
  private timer: Subscription = new Subscription();
  /**
* DEFINICION DE VARIABLE DEL TIEMPO EN MILESEGUNDOS
*/
  private timeOutMilliSeconds: number = 1000;
  /**
* DEFINICION DE VARIABLE SE CONTROL DE LA PANTALLA
*/
  private idleSubscription: Subscription = new Subscription();
  /**
* DEFINICION DE VARIABLE QUE CONTROLA SI YA EXPIRO O NO LA SESSION
*/
  public expired: Subject<boolean> = new Subject<boolean>();

  /**
* DEFINICION DE METODO DE CONFIGURACION DE CADUCIDAD DE SESSION 
*/
  public startWatching(timeOutSeconds: number): Observable<any> {
    this.idle = merge(
      fromEvent(document, 'mousemove'),
      fromEvent(document, 'click'),
      fromEvent(document, 'mousedown'),
      fromEvent(document, 'keypress'),
      fromEvent(document, 'DOMMouseScroll'),
      fromEvent(document, 'mousewheel'),
      fromEvent(document, 'touchmove'),
      fromEvent(document, 'MSPointerMove'),
      fromEvent(window, 'mousemove'),
      fromEvent(window, 'resize'),
    );
    this.timeOutMilliSeconds = timeOutSeconds * 1000;
    this.idleSubscription = this.idle.subscribe((res) => {
      this.resetTimer();
    });
    this.startTimer();
    return this.expired;
  }

  /**
* FUNCION QUE INICIAL EL TIMER DE LA SESSION
*/
  private startTimer() {
    this.timer = timer(this.timeOutMilliSeconds, this.timeOutMilliSeconds).subscribe((res) => {
      this.expired.next(true);
    });
  }
  /**
* FUNCION QUE RESETEA EL TIEMPO DE LA SESSION
*/
  public resetTimer() {
    this.timer.unsubscribe();
    this.startTimer();
  }

  /**
* FUNCION QUE PARA EL TIMER DE LA SECCION
*/
  public stopTimer() {
    this.timer.unsubscribe();
    this.idleSubscription.unsubscribe();
  }
}
