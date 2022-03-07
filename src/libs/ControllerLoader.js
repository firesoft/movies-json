const awilix = require('awilix');

class ControllerLoader {
    constructor({container}) {
        this._container = container;
    }

    getHandler(controllerName) {
        return async (req, res, next) => {
            const scopedContainer = this._container.createScope();
            scopedContainer.register({
                req: awilix.asValue(req),
                res: awilix.asValue(res),
                next: awilix.asValue(next)
            });

            const controller = scopedContainer.resolve(controllerName);
            return controller.handle();
        };
    }
}

module.exports = ControllerLoader;
