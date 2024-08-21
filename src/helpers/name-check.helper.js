const fs = require('fs');
const path = require('path');

const checkFileByName = (fileName) => {
  return new Promise((resolve, reject) => {
    const directoryPath = path.join(__dirname, '../../uploads/')
    const filePath = path.join(directoryPath, fileName);
  
    fs.access(filePath, fs.constants.F_OK, (err) => {
      if (err) {
          console.log(`File "${fileName}" does not exist in directory "${directoryPath}".`)
          resolve(false)
      } else {
          console.log(`File "${fileName}" exists in directory "${directoryPath}".`);
          resolve(true)
        }
      });
  })
}

module.exports = checkFileByName

