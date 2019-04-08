import { Component, ChangeDetectorRef, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  errorMessage = '';
  token = '';
  changeDetectorRef: ChangeDetectorRef;

  constructor(changeDetectorRef: ChangeDetectorRef) {
    this.changeDetectorRef = changeDetectorRef;
  }

  errors = {};
  classes = {
    focus: 'focus',
    complete: 'complete',
    invalid: 'invalid',
    empty: 'empty',
  };
  fonts = [
    'https://fonts.googleapis.com/css?family=Roboto'
  ];
  styles = {
    base: {
      color: '#fff',
      fontWeight: 600,
      fontFamily: 'Roboto',
      fontSize: '16px',
      fontSmoothing: 'antialiased',

      ':focus': {
        color: '#90E9BA',
      },

      '::placeholder': {
        color: '#9FA5AC',
      },

      ':focus::placeholder': {
        color: '#9FA5AC',
      },
    },
    invalid: {
      color: '#EF8356',
      ':focus': {
        color: '#EF8356',
      },
      '::placeholder': {
        color: '#EF83FF',
      },
    },
  };

  setFocus = (el) => {
    el.focus();
  }

  onChange = (status) => {
    const errors = {
      ...this.errors,
      [status.field]: status.error
    };
    this.errors = errors;
    const errMessages: any = Object.values(errors).filter((v: string) => v);
    this.errorMessage = errMessages.length ? errMessages.pop() : '';
    this.changeDetectorRef.detectChanges();
  }

  onTokenize = ({token}) => {
    this.token = token.id;
    this.changeDetectorRef.detectChanges();
  }
}
