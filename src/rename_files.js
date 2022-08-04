const path = require('node:path');
const { copyFile } = require('node:fs/promises');
const { existsSync, mkdirSync } = require('node:fs');

/**
 * Renames images using country names to country codes.
 * Example: 'United Kingdom.png' => 'UK.png'
 * 
 * It takes an array with the list of country objects containing the name and respective ISO country code.
 * Example: [ { name: 'United Kingdom', code: 'UK' } ]
 * 
 * @param {array} files List of files to rename
 * @param {string} inputPath Path for the directory containing the source files
 * @param {string} outputPath Path for the directory for the renamed files
 */
function renameFiles(files, inputPath, outputPath) {
    // Create output directory
    if (!existsSync(outputPath)) {
        mkdirSync(outputPath, { recursive: true });
    }

    const renamedFiles = [];

    for (const file of files) {
        if (file.name && file.newName) {
            const fileInputPath = path.join(inputPath, file.name);
            const fileOutputPath = path.join(outputPath, file.newName);

            renamedFiles.push(new Promise((resolve, reject) => {
                copyFile(fileInputPath, fileOutputPath)
                    .then(() => resolve({
                        filePath: fileOutputPath,
                        fileName: file.newName
                    }))
                    .catch((error) => {
                        // Red text
                        console.log('\x1b[31m%s\x1b[0m', ('- Error reading file: ' + fileInputPath));
                        reject(error.message);
                    });
            }));
        }
    }

    return Promise.allSettled(renamedFiles);
}

module.exports = renameFiles;