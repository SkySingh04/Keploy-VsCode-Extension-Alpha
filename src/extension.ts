// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import { get } from 'http';
import * as vscode from 'vscode';
import getKeployVersion from './version';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "heykeploy" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let hellocommand = vscode.commands.registerCommand('heykeploy.HeyKeploy', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Hey Keploy Community!');
	});

	context.subscriptions.push(hellocommand);

	let versioncommand = vscode.commands.registerCommand('heykeploy.KeployVersion', () => {
		const panel = vscode.window.createWebviewPanel(
            'keployVersion', // Identifies the type of the webview. Used internally
            'Keploy Version', // Title of the panel displayed to the user
            vscode.ViewColumn.One, // Editor column to show the new webview panel in
            {}
        );

        // Get the Keploy version and update the Webview content
        getKeployVersion().then(version => {
            panel.webview.html = `
                <html>
                    <body>
                        <h1>The latest version of Keploy is ${version}</h1>
                    </body>
                </html>
            `;
        }).catch(error => {
            // Display error message in case of failure
            vscode.window.showErrorMessage(`Error fetching Keploy version: ${error}`);
        });
	}
	);

	context.subscriptions.push(versioncommand);
}

// This method is called when your extension is deactivated
export function deactivate() {}
