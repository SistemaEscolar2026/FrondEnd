function omit_special_char(e) {
    var k;
    document.all ? k = e.keyCode : k = e.which;
    return ((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || (k >= 48 && k <= 57));
}
/*SCRIP DONDE SE CREA Y DEFINE FUNCIONES VARIAS*/

function numbersonlyRango(e) {
  var unicode = e.charCode ? e.charCode : e.keyCode
  if (unicode != 8 && unicode != 44) {
    if (unicode < 48 || unicode > 57) //if not a number
    { return false } //disable key press    
  }
}
function isNumberKey(element,evt,deci) {
  var charCode = (evt.which) ? evt.which : event.keyCode
  if (charCode > 31 && (charCode < 48 || charCode > 57) && !(charCode == 46 || charCode == 8))
    return false;
  else {
    var len = $(element).val().length;
    var index = $(element).val().indexOf('.');
    if (index > 0 && charCode == 46) {
      return false;
    }
    if (index > 0) {
      var CharAfterdot = (len + 1) - index;
      if (CharAfterdot > deci) {
        return false;
      }
    }
  }
  return true;
}

function numbersonlydecimal(txt, evt) {
  var charCode = (evt.which) ? evt.which : evt.keyCode;
  if (charCode == 46) {
    //Check if the text already contains the . character
    if (txt.value.indexOf('.') === -1) {
      return true;
    } else {
      return false;
    }
  } else {
    if (charCode > 31 &&
      (charCode < 48 || charCode > 57))
      return false;
  }
  return true;
}

function validaKey(textboxvalue) {
  var evt = textboxvalue;
  var charCode = (evt.which) ? evt.which : evt.keyCode;
  if (charCode === 13) {
    $("#txtCAPTCHA").focus();
    return false;
  }
  else {
    return true;
  }

}
function validaKeycaptcha(textboxvalue) {
  var evt = textboxvalue;
  var charCode = (evt.which) ? evt.which : evt.keyCode;
  if (charCode === 13) {
    $("#btnllamar").focus();
    return false;
  }
  else {
    return true;
  }

}

function numbersonly(e) {
  var unicode = e.charCode ? e.charCode : e.keyCode
  if (unicode != 8 && unicode != 44) {
    if (unicode < 48 || unicode > 57) //if not a number
    { return false } //disable key press    
  }
}

function emailMask(email) {
  var maskedEmail = email.replace(/([^@\.])/g, "*").split('');
  var previous = "";
  for (i = 0; i < maskedEmail.length; i++) {
    if (i <= 1 || previous == "." || previous == "@") {
      maskedEmail[i] = email[i];
    }
    previous = email[i];
  }
  return maskedEmail.join('');
}

function ipKey(txt, evt) {
  var charCode = (evt.which) ? evt.which : evt.keyCode;
  if (charCode == 46) {
      return true;
  } else {
    if (charCode > 31 &&
      (charCode < 48 || charCode > 57))
      return false;
  }
  return true;
}

