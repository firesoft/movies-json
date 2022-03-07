const router = require('express').Router();
const diContainer = require('../../libs/diContainer');

router.post('/', diContainer.resolve('controllerLoader').getHandler('movieAddController'));
router.get('/', diContainer.resolve('controllerLoader').getHandler('moviesGetController'));

module.exports = router;
