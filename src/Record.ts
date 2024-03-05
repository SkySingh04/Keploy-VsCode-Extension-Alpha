import * as vscode from 'vscode';
import { readFileSync } from 'fs';

export async function displayRecordedTestCases(logfilePath: string, webview: any): Promise<void> {
    console.log('Displaying recorded test cases');
    try{
    const logData = readFileSync(logfilePath, 'utf8');
    // console.log(logData);
    // Split the log data into lines
    const logLines = logData.split('\n');
    // Filter out the lines containing the desired information
    const capturedTestLines = logLines.filter(line => line.includes('🟠 Keploy has captured test cases'));
    // Display the captured test cases in your frontend
    if (capturedTestLines.length === 0) {
        webview.postMessage({
            type: 'testcaserecorded',
            value: 'Test Case has been recorded',
            textContent: "No test cases captured. Please try again."
        });
        return;
    }
    capturedTestLines.forEach(testLine => {
        const testCaseInfo = JSON.parse(testLine.substring(testLine.indexOf('{')));
        // const testCaseElement = document.createElement('div');
        console.log(testCaseInfo);
        const textContent = `Test case "${testCaseInfo['testcase name']}" captured at ${testCaseInfo.path}`;
        webview.postMessage({
            type: 'testcaserecorded',
            value: 'Test Case has been recorded',
            textContent: textContent
        });
        // recordedTestCasesDiv.appendChild(testCaseElement);
    });}
    catch(error){
        console.log(error);
        vscode.window.showErrorMessage('Error occurred Keplo Record: ' + error);
        throw error;
    }
}

export async function stopRecording(){
    try{
    vscode.window.activeTerminal?.sendText("^C");
    return;
    }
    catch(error){
        console.log(error);
        throw error;
    }
}

export async function startRecording(command: string, filepath: string, scriptPath: string, logfilePath: string, webview: any): Promise<void> {
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

                const recordCmd = `sudo ${scriptPath} ${command} "${filepath}" ${logfilePath} ; exit 0`;
                // const exitCmd = 'exit';
                terminal.sendText(recordCmd);
                
                // terminal.sendText('exit', true);

                // Listen for terminal close event
                const disposable = vscode.window.onDidCloseTerminal(eventTerminal => {
                    console.log('Terminal closed');
                    if (eventTerminal === terminal) {
                        disposable.dispose(); // Dispose the listener
                        displayRecordedTestCases(logfilePath, webview); // Call function when terminal is closed
                        resolve(); // Resolve the promise
                    }
                });

            } catch (error) {
                console.log(error);
                vscode.window.showErrorMessage('Error occurred Keplo Record: ' + error);
                reject(error);
            }
        });
    }
    catch (error) {
        console.log(error);
        vscode.window.showErrorMessage('Error occurred Keplo Record: ' + error);
        throw error;
    }
}

