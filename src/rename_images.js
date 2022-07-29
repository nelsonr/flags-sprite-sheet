const path = require('node:path');
const { readFile, writeFile } = require('node:fs/promises');
const { existsSync, mkdirSync } = require('node:fs');

/**
 * Renames images using country names to country codes.
 * Example: 'United Kingdom.png' => 'UK.png'
 * 
 * It takes an array with the list of country objects containing the name and respective ISO country code.
 * Example: [ { name: 'United Kingdom', code: 'UK' } ]
 * 
 * @param {array} countries List of objects with countries name and code
 * @param {string} inputPath Path for the directory containing the source images
 * @param {string} outputPath Path for the directory for the renamed images
 */
async function renameImages(countries, inputPath, outputPath) {
    console.log('Renaming image files to country codes...');

    // Create output directory
    if (!existsSync(outputPath)) {
        mkdirSync(outputPath, { recursive: true });
    }

    for (const country of countries) {
        if (country.code) {
            const imageInputPath = path.join(inputPath, `${country.name}.png`);
            const imageOutputPath = path.join(outputPath, `${country.code}.png`);

            try {
                const fileData = await readFile(imageInputPath);
                await writeFile(imageOutputPath, fileData);
            } catch (err) {
                console.log('Error: ', err.message);
            }
        }
    }
}

module.exports = renameImages;