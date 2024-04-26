export function validatePassword(password) {
    if (password.length < 8) {
        return {
            status: "Fjalekalimi duhet te ket te pakten 8 karaktere",
            validated: false,
        };
    }

    if (!/[A-Z]/.test(password)) {
        return {
            status: "Fjalekalimi duhet te ket te pakten 1 germe te madhe",
            validated: false,
        };
    }

    if (!/\d/.test(password)) {
        return {
            status: "Fjalekalimi duhet te ket te pakten 1 numer",
            validated: false,
        };
    }

    return true;
}