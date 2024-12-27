const db = require('../config/mysql');

class RemoteConfigService {
    constructor() {
        this.tableName = 'RemoteConfigs';
    }

    /**
     * Remote config değerini veritabanından alır
     * @returns {Promise<boolean>} - Remote config değeri
     */
    async getRemoteConfig() {
        try {
            const [rows] = await db.query(
                'SELECT value FROM RemoteConfigs ORDER BY id DESC LIMIT 1'
            );
            return rows.length > 0 ? rows[0].value === 1 : true;
        } catch (error) {
            console.error('Error getting remote config:', error);
            return true; // Hata durumunda varsayılan değer
        }
    }

    /**
     * Remote config değerini günceller
     * @param {boolean} value - Yeni config değeri
     * @returns {Promise<boolean>} - Güncellenmiş config değeri
     */
    async setRemoteConfig(value) {
        try {
            const numericValue = value ? 1 : 0;
            await db.query(
                'UPDATE RemoteConfigs SET value = ? WHERE id = 1',
                [numericValue]
            );
            return value;
        } catch (error) {
            console.error('Error setting remote config:', error);
            throw error;
        }
    }
}

module.exports = new RemoteConfigService(); 