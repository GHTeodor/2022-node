const fs = require('fs/promises');
const path = require('path');

const boysPath = path.join(__dirname, 'boys');
const girlsPath = path.join(__dirname, 'girls');

const sorter = async (readFolder, writeFolder, gender) => {
    try {
        const files = await fs.readdir(readFolder/*, {withFileTypes: true}*/);

        for (const file of files) {
            const filePath = path.join(readFolder, file);
            const data = await fs.readFile(filePath);
            const user = JSON.parse(data);

            if (user.gender === gender) {
                await fs.rename(filePath, path.join(writeFolder, file));
            }
        }
    } catch (e) {
        console.error(e);
    }
};

sorter(boysPath, girlsPath, 'female');
sorter(girlsPath, boysPath, 'male');
