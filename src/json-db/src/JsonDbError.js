class JsonDbError extends Error {
    constructor(message, code) {
        super(message);
        this.code = code;
    }

    getCode() {
        return this.code;
    }
}

module.exports = JsonDbError;
