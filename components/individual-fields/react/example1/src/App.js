import React, { Component } from 'react';
import {CardComponent, CardNumber, CardExpiry, CardCVV} from "react-cb";
import './App.css'

class App extends Component {
  CardRef = React.createRef()

  state = {
    errors: {},
    errorMessage: '',
    token:'',
  }

  onSubmit = (e) => {
    if(e) e.preventDefault()
    if(this.CardRef) {
      console.log('initiating tokenize from parent app')
      this.CardRef.current.submit().then((data) => {
        this.setState({
          token: data.token.id
        })
      });
    }
  }

  onChange = (status) => {
    let errors = {
      ...this.state.errors,
      [status.field]: status.error
    };
    let errMessages = Object.values(errors).filter(m => m);
    this.setState({
      errors,
      errorMessage: errMessages.length ? errMessages.pop() : '',
    })
  }

  onReady = (el) => {
    // Automcatically focus when component is ready
    el.focus();
  }

  render() {
    return (
      <div className="example1" id="example1">
        <div className="container">
            <form id="payment">
              <div className="fieldset">
                  <div id="name" className="field empty">
                      <label>Name</label>
                      <input type="text" placeholder="Your name here"></input>
                  </div>
                  <CardComponent type="card" fonts={FONTS} classes={EVENT_CLASSES} locale="en" styles={STYLES} ref={this.CardRef} onReady={(el) => el.focus()}>
                      <CardNumber className="field empty" onChange={this.onChange} onReady={this.onReady} placeholder='number override'>
                        <label>Card</label>
                        <span className="warning-icon">!</span>
                      </CardNumber>
                      <CardExpiry className="field empty" onChange={this.onChange} placeholder='expiry override'>
                        <label>Expiry</label>
                        <span className="warning-icon">!</span>
                      </CardExpiry>
                      <CardCVV className="field empty" onChange={this.onChange} placeholder='cvv override'>
                        <label>CVV</label>
                        <span className="warning-icon">!</span>
                      </CardCVV>
                  </CardComponent>
              </div>
              <button type="submit" id="tokenize" onClick={this.onSubmit} className="submit-button">Pay Now >>></button>
              <div id="error" role="alert">{this.state.errorMessage.message}</div>
              <div id="error" role="alert">{this.state.token}</div>
              </form>
              <div className="disclaimer">
                <span role="img" aria-label="secure">🔒</span>
                This is a secure checkout
              </div>
          </div>
      </div>
    );
  }
}

const EVENT_CLASSES = {
  'focus': 'focus',
  'complete': 'complete',
  'invalid': 'invalid',
  'empty': 'empty',
}

const FONTS = [
  'https://fonts.googleapis.com/css?family=Open+Sans'
]

const STYLES = {
  base: {
    color: '#fff',
    fontWeight: 600,
    fontFamily: 'Quicksand, Open Sans, Segoe UI, sans-serif',
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
}

export default App;
