export const LOG_MESSAGES = {
    SUCCESS: "--- SUCCESS ---",
    ERROR: "--- ERROR ---",
};

const PASSWORD_MIN_LENGTH = 6;
export const PASSWORD = {
    MIN_LENGTH: PASSWORD_MIN_LENGTH,
    ERROR_MESSAGE: `Password is too short, it has to be at least ${PASSWORD_MIN_LENGTH} characters`,
};

export const USER = {
    EXISTS_ERROR_MESSAGE: 'User already exists',
    DATA_ERROR_MESSAGE: 'Invalid username or password',
    SIGNUP_ERROR_MESSAGE: 'Error in the signup process',
};

export const JWT = {
    EXPIRES_IN: 604800000 // 7 * 24 * 60 * 60 * 1000 ms = 7 days
}