const renameFiles = require("./rename_files");
const generateSpriteSheet = require("./generate_sprites");

const config = require('../config.json');
const countries = require('../assets/flags.json');

function main() {
    const flagImages = countries.map((country) => ({ 
        name: country.name + '.png', 
        newName: country.code + '.png' 
    }));

    console.log('Renaming image files to country codes...');

    const renamedFlagImages = renameFiles(
        flagImages,
        config.imagesInputPath,
        config.imagesOutputPath
    );

    renamedFlagImages
        .then((results) => results.filter((r) => r.status === 'fulfilled'))
        .then((results) => results.map((result) => result.value))
        .then((files) => {
            const filteredCountries = countries.filter((country) => {
                return files.find((file) => file.fileName.includes(country.code));
            });
            
            console.log('Renamed flag images count: ', filteredCountries.length);

            generateSpriteSheet(
                filteredCountries,
                config.imagesOutputPath, 
                config.buildPath,
                config.fileName
            );
        });
}

main();