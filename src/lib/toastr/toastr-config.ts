import { SafeHtml } from '@angular/platform-browser';

import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

import { ComponentType } from '../portal/portal';
import { Toast } from './toast-component';
import { ToastRef } from './toast-injector';

/**
 * Configuration for an individual toast.
 */
 export interface IndividualConfig {
  /**
  * toast time to live in milliseconds
  * default: 5000
  */
  timeOut?: number;
  /**
  * toast show close button
  * default: false
  */
  closeButton?: boolean;
  /** time to close after a user hovers over toast */
  /**
   * show toast progress bar
   * default: false
   */
  extendedTimeOut?: number;
  /**
   * show toast progress bar
   * default: false
   */
  progressBar?: boolean;

  /**
   * changes toast progress bar animation
   * default: decreasing
   */
  progressAnimation?: 'increasing' | 'decreasing';
  /**
   * render html in toast message (possibly unsafe)
   * default: false
   */
  enableHtml?: boolean;
  /**
   * css class on toast component
   * default: toast
   */
  toastClass?: string;
  /**
   * css class on toast container
   * default: toast-top-right
   */
  positionClass?: string;
  /**
   * css class on to toast title
   * default: toast-title
   */
  titleClass?: string;
  /**
   * css class on to toast title
   * default: toast-title
   */
  messageClass?: string;
  /**
   * clicking on toast dismisses it
   * default: true
   */
  tapToDismiss?: boolean;
  /**
   * Angular toast component to be shown
   * default: Toast
   */
  toastComponent?: ComponentType<any>;
  /**
   * Helps show toast from a websocket or from event outside Angular
   * default: false
   */
  onActivateTick?: boolean;
}

export interface ToastrIconClasses {
  error?: string;
  info?: string;
  success?: string;
  warning?: string;
}

/**
 * Global Toast configuration
 * Includes all IndividualConfig
 */
export interface GlobalConfig extends IndividualConfig {
  /**
   * max toasts opened. Toasts will be queued
   * Zero is unlimited
   * default: 0
   */
  maxOpened?: number;
  /**
   * dismiss current toast when max is reached
   * default: false
   */
  autoDismiss?: boolean;
  iconClasses?: ToastrIconClasses;
  /**
   * New toast placement
   * default: true
   */
  newestOnTop?: boolean;
  /**
   * block duplicate messages
   * default: false
   */
  preventDuplicates?: boolean;
}

/**
 * Everything a toast needs to launch
 */
export class ToastPackage {
  private _onTap: Subject<any> = new Subject();
  private _onAction: Subject<any> = new Subject();

  constructor(
    public toastId: number,
    public config: IndividualConfig,
    public message: string | SafeHtml | null | undefined,
    public title: string | undefined,
    public toastType: string,
    public toastRef: ToastRef<any>,
  ) { }

  /** Fired on click */
  triggerTap() {
    this._onTap.next();
    this._onTap.complete();
  }

  onTap(): Observable<any> {
    return this._onTap.asObservable();
  }

  /** available for use in custom toast */
  triggerAction(action?: any) {
    this._onAction.next(action);
    this._onAction.complete();
  }

  onAction(): Observable<any> {
    return this._onAction.asObservable();
  }

}

/* tslint:disable:no-empty-interface */
export interface GlobalToastrConfig extends GlobalConfig {}
export interface IndividualToastrConfig extends IndividualConfig {}
export interface ToastrConfig extends IndividualConfig {}
