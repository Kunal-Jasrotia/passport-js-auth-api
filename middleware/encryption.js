const Crypto = require('crypto-js')

module.exports = {
    encrypt: async (text) => {
        const ciphertext = Crypto.AES.encrypt(text, process.env.CYRTPO_SEC).toString();
        return ciphertext
    },
    decrypt: (cipherText) => {
        const bytes = Crypto.AES.decrypt(cipherText, process.env.CYRTPO_SEC);
        const originalText = bytes.toString(Crypto.enc.Utf8);
        return originalText
    }

}