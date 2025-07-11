export const LOG_MESSAGES = {
    SUCCESS: "--- SUCCESS ---",
    ERROR: "--- ERROR ---  ",
    DEBUG: "--- DEBUG ---  ",
};

export function consoleLogError(message: string) {
    const timestamp = new Date().toLocaleString();
    console.log(`${LOG_MESSAGES.ERROR} [${timestamp}] ${message}`);
}

export function consoleLogSuccess(message: string) {
    const timestamp = new Date().toLocaleString();
    console.log(`${LOG_MESSAGES.SUCCESS} [${timestamp}] ${message}`);
}

export function consoleLogDebug(message: string) {
    const timestamp = new Date().toLocaleString();
    console.log(`${LOG_MESSAGES.DEBUG} [${timestamp}] ${message}`);
}

const PASSWORD_MIN_LENGTH = 6;
export const PASSWORD = {
    MIN_LENGTH: PASSWORD_MIN_LENGTH,
    ERROR_MESSAGE: `Password is too short, it has to be at least ${PASSWORD_MIN_LENGTH} characters`,
};

export const SIGNUP_ERROR = {
    USER_EXISTS: 'User already exists',
    FULLNAME_EMAIL_PASSWORD_NULL: 'You must fill all the fields!',
    DATA_ERROR: 'Invalid username or password',
    GENERAL_SIGNUP_ERROR: 'Error in the signup process',
};

export const LOGIN_ERROR = {
    USER_DOESNT_EXIST: 'No such user!',
    WRONG_PASSWORD: 'Wrong password!',
    USER_OR_PASSWORD: 'Invalid login or password!',
    GENERAL_LOGIN_ERROR: 'Internal Server Error!',
};

export const LOGOUT_ERROR: string = "Error in the logout controller";

export const SUCCESS_MESSAGE = {
    SIGNUP: `Signup successful!`,
    LOGIN: `Login successful!`,
    LOGOUT: `Logged out successfuly!`,
}

export const JWT = {
    EXPIRES_IN: 604800000 // 7 * 24 * 60 * 60 * 1000 ms = 7 days
}