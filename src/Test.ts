import * as vscode from 'vscode';
import { readFileSync, appendFile } from 'fs';

export async function displayTestCases(logfilePath: string, webview: any): Promise<void> {
    console.log('Displaying test cases');
    let logData;
    try {
        try {
            logData = readFileSync(logfilePath, 'utf8');
        }
        catch (error) {
            appendFile(logfilePath, "", function (err) {
                if (err) { throw err; }
            });
            logData = readFileSync(logfilePath, 'utf8');
        }
        // console.log(logData);
        // Split the log data into lines
        const logLines = logData.split('\n');
        // Filter out the lines containing the desired information
        // Find the index of the line containing the start of the desired part
        const startIndex = logLines.findIndex(line => line.includes('COMPLETE TESTRUN SUMMARY.'));
        if (startIndex === -1) {
            console.log('Start index not found');
            return;
        }

        // Find the index of the line containing the end of the desired part
        const endIndex = logLines.findIndex((line, index) => index > startIndex && line.includes('<=========================================>'));
        if (endIndex === -1) {
            console.log('End index not found');
            return;
        }

        // Extract the desired part
        const testSummary = logLines.slice(startIndex, endIndex + 1).join('\n');
        console.log(testSummary);
        // Display the captured test cases in your frontend
        if (testSummary.length === 0) {
            webview.postMessage({
                type: 'testResults',
                value: 'Test Failed',
                textSummary: "Error testing. Please try again."
            });
            return;
        }
        webview.postMessage({
                type: 'testResults',
                value: 'Test Summary Generated',
                textSummary: testSummary
            });
            // recordedTestCasesDiv.appendChild(testCaseElement);
        }
    catch (error) {
        console.log(error);
        vscode.window.showErrorMessage('Error occurred Keploy Test: ' + error);
        throw error;
    }
}


export async function startTesting(command: string, filepath: string, scriptPath: string, logfilePath: string, webview: any): Promise<void> {
    try {
        return new Promise<void>((resolve, reject) => {
            try {
                let bashPath: string;
                if (process.platform === 'win32') {
                    bashPath = 'wsl.exe';
                } else {
                    bashPath = '/bin/bash';
                }

                const terminal = vscode.window.createTerminal({
                    name: 'Keploy Terminal',
                    shellPath: bashPath,
                });

                terminal.show();

                const testCmd = `sudo ${scriptPath} ${command} "${filepath}" ${logfilePath} ;exit 0 `;
                // const exitCmd = 'exit';
                terminal.sendText(testCmd);

                // terminal.sendText('exit', true);

                // Listen for terminal close event
                const disposable = vscode.window.onDidCloseTerminal(eventTerminal => {
                    console.log('Terminal closed');
                    if (eventTerminal === terminal) {
                        disposable.dispose(); // Dispose the listener
                        displayTestCases(logfilePath, webview); // Call function when terminal is closed
                        resolve(); // Resolve the promise
                    }
                });

            } catch (error) {
                console.log("error is " + error);
                vscode.window.showErrorMessage('Error occurred Keploy Test: ' + error);
                reject(error);
            }
        });
    }
    catch (error) {
        console.log(error);
        vscode.window.showErrorMessage('Error occurred Keploy Test: ' + error);
        throw error;
    }
}

export async function stopTesting(): Promise<void> {
    try {
        vscode.window.activeTerminal?.sendText("^C");
        return;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
}
