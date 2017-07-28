import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

loginModule = (function() {
  function getElementById(id) {
    return document.getElementById(id);
  }

  function getEmail() {
    return <HTMLInputElement>getElementById("email");
  }

  function getEmailError() {
    return getElementById("emailError");
  }

  function getPassword() {
    return <HTMLInputElement>getElementById("password");
  }

  function getPasswordError() {
    return getElementById("passwordError");
  }

  function getLogin() {
    return <HTMLInputElement>getElementById("login");
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

  function getForgot() {
    return getElementById("forgot");
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
      if (getEmail().value) {
        enable(getForgot());
      } else {
        disable(getForgot());
      }
    }, getKeyupTimeout());
  }

  function passwordKeyUp() {
    window.setTimeout(function() {
      getPasswordError().textContent = null;
      if (getEmail().value && getPassword().value) {
        enable(getLogin());
      } else {
        disable(getLogin());
      }
    }, getKeyupTimeout());
  }

  function clearEmail() {
    getEmail().value = null;
  }

  function clearPassword() {
    getPassword().value = null;
  }

  function login() {
    if (isValidEmail() && isValidPassword()) {
      console.log('login: ' + getEmail().value);
      reset();
    }
  }

  function forgot() {
    if (isValidEmail()) {
      console.log('forgot: ' + getEmail().value);
      clearPassword();
      passwordFocus();
    }
  }

  function reset() {
    clearEmail();
    clearPassword();
    disable(getLogin());
    disable(getForgot());
    emailFocus();
  }

  document.addEventListener("DOMContentLoaded", function() {

    reset();

    getEmail().addEventListener('keyup', function() {
      emailKeyUp();
    });

    getPassword().addEventListener('keyup', function() {
      passwordKeyUp();
    });

    getLogin().addEventListener('click', function() {
      login();
    });

    getForgot().addEventListener('click', function() {
      forgot();
    });
  });
})();

}
