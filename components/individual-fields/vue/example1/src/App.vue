<template>
  <div class="example1" id="example1">
    <div class="container">
          <form id="payment">
            <div class="fieldset">
              <div class="field">
                <label >Name</label>
                <input type="text" placeholder="Name">
              </div>
              <CardField :fonts="fonts" :styles="styles" :locale="locale" :classes="classes" ref="CardField" @focus="onFocus" @ready="onReady"> <!-- :placeholder="placeholder"  -->
                <CardNumber :styles="fieldStyles" class="field empty" @change="onChange" @focus="onFocus" @ready="onReady" :placeholder="'number override'" >
                  <label>Card</label>
                </CardNumber>
                <CardExpiry :styles="fieldStyles" class="field empty" @change="onChange" @focus="onFocus" :placeholder="'expiry override'">
                  <label>Expiry</label>
                </CardExpiry>
                <CardCvv :styles="fieldStyles" class="field empty" @change="onChange" @focus="onFocus" :placeholder="'cvv override'">
                  <label>CVV</label>
                </CardCvv>
              </CardField>
            </div>
            <button type="submit" id="tokenize" class="submit-button" v-on:click="onSubmit">Pay $25 & Tokenize</button>
            <div id="error">
              {{errorMessage.message}}
            </div>
          </form>
          <div class="disclaimer">🔒This is a secure checkout</div>
      </div>
  </div>
</template>

<script>
import {CardField, CardNumber, CardExpiry, CardCvv} from 'cb-vue';

export default {
  name: 'app',
  components: {
    CardField,
    CardNumber,
    CardExpiry,
    CardCvv,
  },

  data () {
    return {
      placeholder: {
        number: 'Card number placeholder',
        cvv: 'Card cvv placeholder',
        expiry: 'Card expiry placeholder'
      },
      styles: STYLES,
      locale: 'en',
      classes: {
        focus: 'focus',
        complete: 'complete',
        invalid: 'invalid',
        empty: 'empty'
      },
      fieldStyles: {
        base: {
          ':focus': {
            color: 'green'
          }
        }
      },
      fonts: [
        'https://fonts.googleapis.com/css?family=Roboto:100'
      ],
      errors: {},
      errorMessage: ''
    }
  },

  methods: {
    onSubmit (e) {
      e.preventDefault()
      this.$refs.CardField.submit().then((data) => {
        console.log('tokenized', data)
      })
    },
    onChange (status) {
      let errors = {
        ...this.errors,
        [status.field]: status.error
      }
      this.errors = errors
      let errMessages = Object.values(errors).filter(v => v)
      this.errorMessage = errMessages.length ? errMessages.pop() : ''
    },
    onFocus (status) {
      console.log('on focus', status)
    },
    onReady (el) {
      el.focus()
    }
  },
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
</script>

<style>

:root {
  --primary-color: #90E9BA;
  --primary-text: #FFFFFF;
  --secondary-text: #9FA5AC;
  --bg-primary: #404B5A;
  --bg-secondary: #2A313C;
  --bg-tertiary: #2C323D;
  --warning: #EF8356;
}

body {
  font-family: Roboto;
  font-weight: 100;
  font-size: 16px;
}

#example1 {
  width: 100%;
  height: 100%;
  min-height: 100vh;
  background-color: var(--bg-tertiary);
  display: flex;
  justify-content: center;
}

#example1 .container {
  width: 30%;
  background-color: var(--bg-secondary);
  padding: 10em;
}

.fieldset {
  height: inherit;
}

.field {
  min-height: 30px;
  border-radius: 6px;
  background-color: var(--bg-primary);
  padding: 10px 20px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  position: relative;
}

.field .warning-icon {
  background-color: var(--warning);
  border-radius: 100%;
  padding: 1px 8px;
  font-size: 14px;
  font-weight: 600;
  position: absolute;
  right: 10px;
  opacity: 0;
  transition: opacity .1s ease-in;
  pointer-events: none;
  user-select: none;
}

.field.invalid .warning-icon {
  opacity: 1;
  transition: opacity .1s ease-out;
}

.field label {
  color: var(--primary-text);
  min-width: 15%;
}

.field input {
  background-color: transparent;
  font-size: 16px;
  font-weight: 100;
  border: 0;
  width: 100%;
  outline: 0;
  color: var(--secondary-text);
}

.field input:focus {
  color: var(--primary-color);
}

.submit-button {
  width: 100%;
  padding: 15px 0;
  border-radius: 6px;
  background-color: var(--primary-color);
  color: black;
  font-size: 17px;
  font-weight: 500;
  text-transform: uppercase;
  border: 0;
  outline: 0;
  cursor: pointer;
}

.disclaimer {
  text-align: center;
  padding-top: 10px;
  font-size: 12px;
  font-weight: bolder;
  color: var(--secondary-text);
  pointer-events: none;
  user-select: none;
}

#error {
  padding-top: 10px;
  text-align: center;
  color: var(--warning);
  font-weight: 800;
}

</style>
