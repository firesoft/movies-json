const config = require('config');

module.exports = (req, res) => {
    res.json({
        status: 'online',
        name: config.get('service.name'),
        ip: config.get('server.ip'),
        port: config.get('server.port'),
        upTime: parseInt(process.uptime(), 10)
    });
};
