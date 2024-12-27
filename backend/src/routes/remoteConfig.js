const express = require('express');
const router = express.Router();
const remoteConfigService = require('../services/remoteConfig');

router.get('/', async (req, res) => {
    try {
        const result = await remoteConfigService.getRemoteConfig();
        res.json({ remoteConfig: result });
    } catch (error) {
        res.status(500).json({ error: 'Veritabanı hatası' });
    }
});

router.post('/', async (req, res) => {
    try {
        const { remoteConfig } = req.body;

        if (typeof remoteConfig !== 'boolean') {
            return res.status(400).json({
                error: 'remoteConfig değeri boolean olmalıdır'
            });
        }

        const result = await remoteConfigService.setRemoteConfig(remoteConfig);
        res.json({ remoteConfig: result });
    } catch (error) {
        res.status(500).json({ error: 'Veritabanı hatası' });
    }
});

module.exports = router; 