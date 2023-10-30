const util = require('util');
const executeCliCommand = util.promisify(require('child_process').exec);

const executeQuery = async (queryString, targetOrg) => {
  const cliCommand = `sf data query --query "${queryString}" --target-org "${targetOrg}" --result-format csv`;
  try{
    const { stdout } = await executeCliCommand(cliCommand);
    return stdout;
  } catch(error){
    //Remove extra text from error message
    const message = error.message;
    const errorIndex = message.indexOf('ERROR');
    const errorMessage = errorIndex !== -1 ? message.substring(errorIndex) : null;
    throw new Error(errorMessage || error.message);
  }

};

module.exports = {
  executeQuery
}