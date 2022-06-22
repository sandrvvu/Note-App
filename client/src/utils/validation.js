const regex = '^[A-Za-z0-9]+$';

export const validLogin = (login) => {
    if (login.trim().length > 0 && login.match(regex)) {
        return true;
    }
    return false;
};
export const validPassword = (password) => {
    if (password.trim().length >= 4) {
        return true;
    }
    return false;
};

export const validInput = (input) => {
    if (input.trim().length > 0) {
      return true
    }
    return false
  }