const renameImages = require("./rename_images");
const generateSpriteSheet = require("./generate_sprites");

const config = require('../config.json');
const countries = require('../assets/flags.json');

async function main() {
    await renameImages(
        countries,
        config.imagesInputPath,
        config.imagesOutputPath
    );
    generateSpriteSheet(
        countries,
        config.imagesOutputPath, 
        config.buildPath,
        config.fileName
    );
}

main();