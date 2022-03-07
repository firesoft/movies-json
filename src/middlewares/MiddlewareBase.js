class MiddlewareBase {
    static create() {
        const middleware = this._createMiddleware();
        return middleware.getHandler();
    }

    static _createMiddleware() {
        return new this();
    }

    getHandler() {
        throw new Error('Method "getHandler" not implemented.');
    }
}

module.exports = MiddlewareBase;
