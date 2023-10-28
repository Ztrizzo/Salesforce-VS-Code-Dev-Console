const fs = require('fs').promises;
const os = require('os');

const orgCredentials = [];
const homeDir = os.homedir();
const sfdxCredentialsDir = `${homeDir}/.sfdx`;


//Read the files in the .sfdx folder and get the org credentials
const getOrgCredentials = async () => {
  try {
    const listOfFilesInDir = await fs.readdir(sfdxCredentialsDir);
    await Promise.all(listOfFilesInDir.map(async (file) => {
      const pathToFile = `${sfdxCredentialsDir}/${file}`;
      const fileExtension = file.split('.').pop();
      if (fileExtension === 'json') {
        const data = await fs.readFile(pathToFile, 'utf8');
        processFile(data);
      }
    }));
    return orgCredentials;
  } catch (err) {
    console.error(err);
    return orgCredentials;
  }
};

const processFile = (data) => {
  try {
    const parsedData = JSON.parse(data);
    if (parsedData.accessToken) {
      orgCredentials.push(parsedData);
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getOrgCredentials
};
