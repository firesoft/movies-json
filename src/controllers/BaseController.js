class BaseController {
    constructor({req, res, next}) {
        this._req = req;
        this._res = res;
        this._next = next;

        this._validator = null;
        this._reqData = {};
    }

    async handle() {
        try {
            await this._validate();
            const resData = await this._processRequest();
            this._respond(resData);
        } catch (err) {
            this._next(err);
        }
    }

    async _validate() {
        if (!this._validator) {
            return;
        }
        this._reqData = await this._validator.validate(this._req);
    }

    _respond(resData) {
        this._res.json(resData);
    }
}

module.exports = BaseController;
