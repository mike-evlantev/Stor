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
    // anystring@anystring.anystring
    const regex = /\S+@\S+\.\S+/;
    if (!regex.test(email)) {
      error = "Valid Email is required";
    }
    return error;
  },
  validatePhone(phone) {
    let error = "";
    // '1234567890', 1234567890, '(078)789-8908', '123-345-3456'
    const regex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if (!regex.test(phone)) {
      error = "Valid Phone is required";
    }
    return error;
  },
  validatePassword(password) {
    let error = "";
    // Minimum eight characters, at least one letter and one number:
    //const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    const regExp = /[a-zA-Z]/;
    if (!password) {
      error = "Password is required";
    } else if (password.length < 8) {
      error = "Password must contain at least 8 characters";
    } else if (!isNaN(password)) {
      error = "Password must contain at least one number";
    } else if (regExp.test(password)) {
      error = "Password must contain at least one letter";
    }
    return error;
  },
};
