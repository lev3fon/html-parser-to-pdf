const decompress = require('decompress');

const unZip = async (zipPath, distPath) => {
    try {
        await decompress(zipPath, distPath)
    } catch (error) {
        console.log(error)
    }
}

module.exports = { unZip }