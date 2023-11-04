const util = require('util');
const executeCliCommand = util.promisify(require('child_process').exec);

const openTargetOrg = async (targetOrg) => {
  const cliCommand = `sf org open --target-org ${targetOrg}`;
  try{
    await executeCliCommand(cliCommand);
  } catch(error){
    //Remove extra text from error message
    const message = error.message;
    const errorIndex = message.indexOf('ERROR');
    const errorMessage = errorIndex !== -1 ? message.substring(errorIndex) : null;
    throw new Error(errorMessage || error.message);
  }

};

module.exports = {
  openTargetOrg
}