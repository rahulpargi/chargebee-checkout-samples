document.addEventListener("DOMContentLoaded", () => {
    // Initialize Chargebee
    let cbInstance = Chargebee.init({
      site: 'mannar-test',
      publishableKey: 'test___dev__Nhmc4vDO1z2KAecdmiG1eUsIH0Dot9phQ',
      currencyCode: 'USD'
    });

    let options = {
      fonts: [
        'https://fonts.googleapis.com/css?family=Roboto'
      ],
      locale: "en",
      classes: {
        focus: 'focus',
        invalid: 'invalid',
        empty: 'empty',
        complete: 'complete',
      },
      style: {
        base: {
          color: '#9FA5AC',
          fontWeight: 600,
          fontFamily: 'Roboto',
          fontSize: '16px',
          fontSmoothing: 'antialiased',

          ':focus': {
            color: '#90E9BA',
          },

          '::placeholder': {
            color: '#9BACC8',
          },

          ':focus::placeholder': {
            color: '#CFD7DF',
          },
        },
        invalid: {
          color: '#EF8356',
          ':focus': {
            color: '#EF8356',
          },
          '::placeholder': {
            color: '#EF8356',
          },
        },
      },
    }

    let errors = {}
    const errorHandler = (event) => {
      let error = document.getElementById('error')
      if(event.error) {
        errors[event.field] = event.error
        error.innerText = event.error.message
      } else {
        errors[event.field] = null
        // check for any other available errors
        let _errors = Object.values(errors).filter(val => val)
        if(_errors.length) error.innerText = _errors.pop().message
        else error.innerText = ''
      }
    }
    
    let cbComponent = cbInstance.createComponent('card', options).at("card-combined");
    let numberField = cbComponent.createField('number').at("card-number");
    let expiryField = cbComponent.createField('expiry').at("card-expiry");
    let cvvField = cbComponent.createField('cvv').at("card-cvc");
    numberField.on('change', errorHandler)
    expiryField.on('change', errorHandler)
    cvvField.on('change', errorHandler)
    cbComponent.mount();

    document.getElementById("payment").addEventListener("submit", (e) => {
      e.preventDefault();
      let error = document.getElementById('error')
      cbInstance.tokenize(cbComponent).then(({token}) => {
        error.innerText = token.id
      });
    })
  });