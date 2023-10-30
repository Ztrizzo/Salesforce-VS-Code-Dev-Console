const fs = require('fs').promises;
const os = require('os');

const orgCredentials = [];
const homeDir = os.homedir();
const sfdxCredentialsDir = `${homeDir}/.sfdx`;
const sfdxAliasesPath = `${homeDir}/.sfdx/alias.json`;

let aliases = {};

const getAliases = async () => {
  try{
    const aliasFile = await fs.readFile(sfdxAliasesPath, 'utf8');
    aliases = JSON.parse(aliasFile).orgs;

    // Make the username the key of the object and the alias the value.
    const reversedAliases = {};
    for(const alias in aliases){
      reversedAliases[aliases[alias]] = alias;
    }
    return reversedAliases;
  } catch(error){
    console.error(error);
  }
}

//Read the files in the .sfdx folder and get the org credentials
const getOrgCredentials = async () => {
  try {
    aliases = await getAliases();
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
      // Add alias property
      parsedData.alias = aliases[parsedData.username];
      orgCredentials.push(parsedData);
    }
  } catch (err) {
    console.error(err);
  }
};

getOrgCredentials();

module.exports = {
  getOrgCredentials
};
