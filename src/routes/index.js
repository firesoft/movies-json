const router = require('express').Router();
const diContainer = require('../libs/diContainer');
const infoController = require('../controllers/info');

router.get('/', infoController);
router.post('/movies', diContainer.resolve('controllerLoader').getHandler('movieAddController'));
router.get('/movies', diContainer.resolve('controllerLoader').getHandler('moviesGetController'));

module.exports = router;
