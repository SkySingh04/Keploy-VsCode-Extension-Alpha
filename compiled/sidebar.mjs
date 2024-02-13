import getKeployVersion from '../src/version';
import * as vscode from 'vscode';

const getVersionButton = document.getElementById('getVersionButton');
if (getVersionButton) {
  getVersionButton.addEventListener('click', async () => {
    try {
      // Call the getKeployVersion function
      const version = await getKeployVersion();
      // Show the version information
      vscode.window.showInformationMessage("The latest version of Keploy is " + version);
    } catch (error) {
      // Handle any errors that occur
      vscode.window.showErrorMessage("Error getting Keploy version: " + error.message);
    }
  });
}
