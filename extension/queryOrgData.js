const util = require('util');
const executeCliCommand = util.promisify(require('child_process').exec);

const executeQuery = async (queryString, targetOrg) => {
  const cliCommand = `sf data query --query "${queryString}" --target-org "${targetOrg}" --result-format csv`;
  
  const { stdout, stderr } = await executeCliCommand(cliCommand);
  console.log(stdout || stderr);
  return stdout || stderr;
};

// executeQuery('SELECT Id FROM Contact', 'devhub');

module.exports = {
  executeQuery
}