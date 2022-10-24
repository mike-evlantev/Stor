const regex = {
    email: /\S+@\S+\.\S+/, // anystring@anystring.anystring
    phone: /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/, // '1234567890', 1234567890, '(078)789-8908', '123-345-3456'
    containsNumber: /\d+/,
    containsAlphabet: /[a-zA-Z]/,
    password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, // Minimum eight characters, at least one letter and one number:
};

export function validateField({key, value}: {key: string, value: string | undefined}) {
    let error = "";
    //console.log(`formValidator ${key}:${value}`);
    switch (key) {
        case "first":
            if (!value) {
                error = "First name is required";
            } else if (value.length > 100) {
                error = "First name is too long";
            }
            break;
        case "last":
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
            if (value && value.length > 255) {
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
            if (value && !regex.phone.test(value)) {
                error = "Valid phone is required";
            }
            break;
        case "email":
            if (value && !regex.email.test(value)) {
                error = "Valid email is required";
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
        case "nameOnCard":
            if (!value) {
                error = "Name on card is required";
            }
            break;
        default:
            break;
    }
    //console.log(`formValidator result: ${error}`);
    return error;
  };

export function validateState(state: string): string {
    let error = "";
    if (!state || state === "Select...") {
        error = "State is required";
    }
    return error;
};

export function validateEmail(email: string): string {
    let error = "";
    if (!regex.email.test(email)) {
        error = "Valid email is required";
    }
    return error;
};

export function validatePassword(password: string): string {
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
};
