const config = require('config');
const router = require('express').Router();

function getInfo() {
    return {
        status: 'online',
        name: config.get('service.name'),
        ip: config.get('server.ip'),
        port: config.get('server.port'),
        upTime: parseInt(process.uptime(), 10)
    };
}

router.get('/', (req, res) => {
    res.json(getInfo());
});

module.exports = router;
