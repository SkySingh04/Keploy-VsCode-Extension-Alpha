import * as vscode from 'vscode';
import {exec} from 'child_process';
import * as os from 'os';
import getKeployVersion from './version';
const execShell = (cmd: string) => {
    return new Promise<string>((resolve, reject) => {
        let commandToExecute: string;
        if (os.platform() === 'win32') {
            // Execute the command in the WSL environment if on Windows
            commandToExecute = `wsl ${cmd}`;
        } else {
            // Execute the command in the default shell if on other platforms
            commandToExecute = cmd;
        }
        exec(commandToExecute, (err, stdout, stderr) => {
            if (err) {
                reject(err.message);
                return;
            }
            if (stderr) {
                console.log(stderr); // Log stderr but don't reject the promise
            }
            resolve(stdout);
        });
        
    });
};
export async function downloadAndUpdate(downloadUrl: string): Promise<void> {
    const output = await execShell('keploy --version');
    const keployIndex = output.indexOf('Keploy');
    let keployVersion = '';
    if (keployIndex !== -1) {
        keployVersion = output.substring(keployIndex + 'Keploy'.length).trim();
    }

    console.log('Current Keploy version:', keployVersion);
    if (!keployVersion) {
        vscode.window.showErrorMessage('You dont have Keploy installed. Please install Keploy first');
        return;
    }
    const latestVersion = await getKeployVersion();
    // Remove "v" from the beginning of the latest version string, if present
    const formattedLatestVersion = latestVersion.startsWith('v') ? latestVersion.substring(1) : latestVersion;
    
    console.log('Latest Keploy version:', formattedLatestVersion);

    if (keployVersion === formattedLatestVersion) {
        vscode.window.showInformationMessage('Keploy is already up to date');
        return;
    }

     console.log('Downloading and updating Keploy binary...');
     vscode.window.showInformationMessage('Downloading and updating Keploy binary...');
    return new Promise<void>((resolve, reject) => {
        
        let aliasPath = "/usr/local/bin/keploybin"; 
        try {
            let bashPath: string;
            if (process.platform === 'win32') {
                // If on Windows, use the correct path to WSL's Bash shell
                bashPath = 'wsl.exe';
            } else {
                // Otherwise, assume Bash is available at the standard location
                bashPath = '/bin/bash';
            }
            // Create a new terminal instance with the Bash shell
            const terminal = vscode.window.createTerminal({
                name: 'Keploy Terminal',
                shellPath: bashPath
            });

            // Show the terminal
            terminal.show();

            const curlCmd = `curl --silent --location ${downloadUrl} | tar xz -C /tmp `;
            const moveCmd = `sudo mv /tmp/keploy ${aliasPath}`;

            // Execute commands asynchronously
            const executeCommand = async (command: string) => {
                return new Promise<void>((resolve, reject) => {
                    terminal.sendText(command);
                    // terminal.sendText('echo $?'); // Output the exit status
                    // (window as any).onDidWriteTerminalData((event: any) => console.log(event.data.trim()))
                    setTimeout(() => resolve(), 8000); // Assuming commands will complete within 3 seconds
                    //we need to figure out a way to find out if command is completed successfully or not
                });
            };

            // Execute commands sequentially
            Promise.all([
                executeCommand(curlCmd),
                executeCommand(moveCmd)
            ]).then(() => {
                // Display an information message
                vscode.window.showInformationMessage('Downloading and updating Keploy binary...');
                resolve(); // Resolve the promise if all commands succeed
            }).catch(error => {
                reject(error); // Reject the promise if any command fails
            });
        } catch (error) {
            reject(error); // Reject the promise if an error occurs during execution
        }
    });
}

export async function downloadAndUpdateDocker(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        console.log('Downloading and updating Keploy Docker image...');
        const dockerCmd = 'docker pull ghcr.io/keploy/keploy:latest';
        execShell(dockerCmd).then(() => {
            vscode.window.showInformationMessage('Updated Keploy Docker image successfully!');
            resolve();
        }).catch(error => {
            console.error('Failed to update Keploy Docker image:', error);
            vscode.window.showErrorMessage('Failed to update Keploy Docker image');
            reject(error);
        }
        );
    }
    );
}

        
