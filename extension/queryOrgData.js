const util = require('util');
const executeCliCommand = util.promisify(require('child_process').exec);
const vscode = require('vscode');
const fs = require('fs').promises;

const executeQuery = async (queryString, targetOrg) => {
  const cliCommand = `sf data query --query "${queryString}" --target-org "${targetOrg}" --result-format json`;
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

const queryWithCSVResult = async (queryString, targetOrg) => {
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

const downloadQueryAsCSV = async (queryString, targetOrg) => {
  const csvContent = await queryWithCSVResult(queryString, targetOrg);
  const uri = await vscode.window.showSaveDialog({
    filters: {
        'CSV files': ['csv']
    }
  });
  if (uri) {
    try {
        // Write the CSV content to the chosen file path using async/await
        await fs.writeFile(uri.fsPath, csvContent);
        vscode.window.showInformationMessage('CSV file saved successfully');
    } catch (error) {
        vscode.window.showErrorMessage('Failed to save CSV file');
    }
  }
};

module.exports = {
  executeQuery,
  downloadQueryAsCSV
}