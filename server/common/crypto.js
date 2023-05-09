const crypto = require('crypto');

module.exports.randomImageName = (btyes = 32) => {
    return crypto.randomBytes(btyes).toString('hex');
}