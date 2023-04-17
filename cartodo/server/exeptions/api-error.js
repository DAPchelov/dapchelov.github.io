class ApiError extends Error {
    status;
    errors;

    constructor(status, message, error = []) {
        super(message);
        this.status = status;
        this.errors = error;
    };

    static UnautorizedError() {
        return new ApiError(401, 'Пользователь не авторизован');
    };
    static AuthenticationTimeout() {
        return new ApiError(419, 'Время жизни токена истекло');
    };

    static BadRequest(message, errors = []) {
        return new ApiError(400, message, errors);
    };
}

export default ApiError;