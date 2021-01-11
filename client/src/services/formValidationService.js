const regex = {
  email: /\S+@\S+\.\S+/, // anystring@anystring.anystring
  phone: /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/, // '1234567890', 1234567890, '(078)789-8908', '123-345-3456'
  containsNumber: /\d+/,
  containsAlphabet: /[a-zA-Z]/,
  password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, // Minimum eight characters, at least one letter and one number:
};

export const formValidationService = {
  validateFirstName(firstName) {
    let error = "";
    if (!firstName) {
      error = "First name is required";
    } else if (firstName.length > 100) {
      error = "First name is too long";
    }
    return error;
  },
  validateLastName(lastName) {
    let error = "";
    if (!lastName) {
      error = "Last name is required";
    } else if (lastName.length > 100) {
      error = "Last name is too long";
    }
    return error;
  },
  validateAddress1(address1) {
    let error = "";
    if (!address1) {
      error = "Address is required";
    } else if (address1.length > 255) {
      error = "Address is too long";
    }
    return error;
  },
  validateAddress2(address2) {
    let error = "";
    if (address2.length > 255) {
      error = "Address is too long";
    }
    return error;
  },
  validateCity(city) {
    let error = "";
    if (!city) {
      error = "City is required";
    } else if (city.length > 255) {
      error = "City is too long";
    }
    return error;
  },
  validateState(state) {
    let error = "";
    if (!state) {
      error = "State is required";
    }
    return error;
  },
  validateZip(zip) {
    let error = "";
    if (!zip) {
      error = "Zip code is required";
    } else if (zip.length > 10) {
      error = "Valid zip code is required";
    }
    return error;
  },
  validateEmail(email) {
    let error = "";
    if (!regex.email.test(email)) {
      error = "Valid Email is required";
    }
    return error;
  },
  validatePhone(phone) {
    let error = "";
    if (!regex.phone.test(phone)) {
      error = "Valid Phone is required";
    }
    return error;
  },
  validatePassword(password) {
    let error = "";
    if (!password) {
      error = "Password is required";
    } else if (password.length < 8) {
      error = "Password must contain at least 8 characters";
    } else if (!regex.containsNumber.test(password)) {
      error = "Password must contain at least one number";
    } else if (!regex.containsAlphabet.test(password)) {
      error = "Password must contain at least one letter";
    }
    return error;
  },
  validateField(key, value) {
    let error = "";
    console.log(`FVS Validating ${key}:${value}`);
    switch (key) {
      case "firstName":
        if (!value) {
          error = "First name is required";
        } else if (value.length > 100) {
          error = "First name is too long";
        }
        break;
      case "lastName":
        if (!value) {
          error = "Last name is required";
        } else if (value.length > 100) {
          error = "Last name is too long";
        }
        break;
      case "address1":
        if (!value) {
          error = "Address is required";
        } else if (value.length > 255) {
          error = "Address is too long";
        }
        break;
      case "address2":
        if (value.length > 255) {
          error = "Address is too long";
        }
        break;
      case "city":
        if (!value) {
          error = "City is required";
        } else if (value.length > 100) {
          error = "City is too long";
        }
        break;
      case "state":
        if (!value) {
          error = "State is required";
        }
        break;
      case "zip":
        if (!value) {
          error = "Zip code is required";
        } else if (value.length > 10) {
          error = "Valid zip code is required";
        }
        break;
      case "phone":
        if (!regex.phone.test(value)) {
          error = "Valid Phone is required";
        }
        break;
      case "email":
        if (!regex.email.test(value)) {
          error = "Valid Email is required";
        }
        break;
      case "password":
        if (!value) {
          error = "Password is required";
        } else if (value.length < 8) {
          error = "Password must contain at least 8 characters";
        } else if (!regex.containsNumber.test(value)) {
          error = "Password must contain at least one number";
        } else if (!regex.containsAlphabet.test(value)) {
          error = "Password must contain at least one letter";
        }
        break;
      default:
        break;
    }
    console.log(`FVS Validation result: ${error}`);
    return error;
  },
};
