import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

registerModule = (function() {
  function getElementById(id) {
    return document.getElementById(id);
  }

  function getEmail() {
    return <HTMLInputElement>getElementById("register-email");
  }

  function getEmailError() {
    return getElementById("registrationEmailError");
  }

  function getPassword() {
    return <HTMLInputElement>getElementById("register-password");
  }

  function getPasswordError() {
    return getElementById("registrationPasswordError");
  }

  function getRegister() {
    return <HTMLInputElement>getElementById("register");
  }

  function emailFocus() {
    getEmail().focus();
  }

  function passwordFocus() {
    getPassword().focus();
  }

  function getGuest() {
    return getElementById("guest");
  }

  function disable(element) {
    // enable/disable buttons for added fun :)
    element.disabled = {
      value: true
    };
  }

  function enable(element) {
    // enable/disable buttons for added fun :)
    if (element.hasAttribute("disabled")) {
      element.attributes.removeNamedItem("disabled");
    }
  }

  function testRegX(regX, value) {
    return regX.test(value);
  }

  function setTextContent(element, value) {
    element.textContent = value;
  }

  function isValidEmail() {
    // purposefully simple email regex that matches input type=email.
    if (!testRegX(/^[^\s@]+@[^\s@]+$/, getEmail().value)) {
      setTextContent(getEmailError(), 'Invalid Email format.');
      emailFocus()
      return false;
    } else {
      setTextContent(getEmailError(), null);
      return true;
    }
  }

  function isValidPassword() {
    if (!testRegX(/\S{9,}/, getPassword().value)) {
      setTextContent(getPasswordError(), 'Password must be more than 9 characters.');
      passwordFocus()
      return false;
    } else {
      setTextContent(getPasswordError(), null);
      return true;
    }
  }

  function getKeyupTimeout() {
    return 250;
  }

  function emailKeyUp() {
    window.setTimeout(function() {
      getEmailError().textContent = null;
    }, getKeyupTimeout());
  }

  function passwordKeyUp() {
    window.setTimeout(function() {
      getPasswordError().textContent = null;
      if (getEmail().value && getPassword().value) {
        enable(getRegister());
      } else {
        disable(getRegister());
      }
    }, getKeyupTimeout());
  }

  function clearEmail() {
    getEmail().value = null;
  }

  function clearPassword() {
    getPassword().value = null;
  }

  function register() {
    if (isValidEmail() && isValidPassword()) {
      console.log('register: ' + getEmail().value);
      reset();
    }
  }

  function asGuest() {
    console.log('sign in as guest: guestxxx');
  }

  function reset() {
    clearEmail();
    clearPassword();
    disable(getRegister());
  }

  document.addEventListener("DOMContentLoaded", function() {

    reset();

    getEmail().addEventListener('keyup', function() {
      emailKeyUp();
    });

    getPassword().addEventListener('keyup', function() {
      passwordKeyUp();
    });

    getRegister().addEventListener('click', function() {
      register();
    });

    getGuest().addEventListener('click', function() {
      asGuest();
    });
  });
})();

}
