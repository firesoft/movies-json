class ValidationError extends Error {
    constructor(joiError) {
        super(joiError.message);
        this.status = 400;
        this.errors = joiError.details;
    }
}

module.exports = ValidationError;
