const fs = require('fs');
const path = require('path');
const csv = require('fast-csv');
const importModel = require('../models/import.model'); 

async function importCSVFile(filename, res) {
    const filePath = path.resolve(__dirname, '../../uploads/', filename.toString());
    const stream = fs.createReadStream(filePath);

    let rowData = 0;
    let importPromises = [];

    const csvStream = csv.parse({ headers: true })
        .on('error', error => {
            throw error;
        })
        .on('data', (row) => {
            const { nama, email, telepon, alamat } = row;
            const data = { nama, email, telepon, alamat };

            // Push the promise to the array for later resolution
            importPromises.push(importModel.insert(data));
            rowData++;
        })
        .on('end', async () => {
            try {
                await Promise.all(importPromises);

                const newData = await importModel.findAll(rowData);
                return res.json({
                    success: true,
                    message: `${filename} is imported to DB`,
                    return: newData
                });
            } catch (error) {
                return res.status(500).json({
                    success: false,
                    message: 'Failed to import data',
                    error: error.message
                });
            }
        });

    stream.pipe(csvStream);
}

module.exports = {
    importCSVFile
};
