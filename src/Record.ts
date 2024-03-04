import * as vscode from 'vscode';
import * as os from 'os';
import { execShell } from './execShell';
import { spawn } from './nodepty';

export async function startRecording(command: string, filepath: string) {
    console.log("Somehow reached till here yay");
    console.log(command);
    console.log(filepath);
    try {
        return new Promise<void>((resolve, reject) => {
            try {
                let bashPath: string;
                if (process.platform === 'win32') {
                    // If on Windows, use the correct path to WSL's Bash shell
                    bashPath = 'wsl.exe';
                } else {
                    // Otherwise, assume Bash is available at the standard location
                    bashPath = '/bin/bash';
                }
                console.log("Bash path: " + bashPath);

                // Spawn a new shell process using node-pty
                const shell = spawn(bashPath, [], {
                    name: 'xterm-color',
                    cols: 80,
                    rows: 30,
                    cwd: process.cwd(),
                    env: process.env
                });

                console.log("Shell spawned");

                // Send the record command to the shell
                shell.write(`keploy record -c ${command} ${filepath}\r`);

                // Capture the output of the command
                let output = '';
                shell.onData((data: string) => {
                    output += data;
                });

                // Resolve the promise when the shell process exits
                shell.onExit((e: { exitCode: number; signal?: number | undefined; }) => {
                    if (e.exitCode === 0) {
                        resolve(); // Fix: Resolve with void value
                    } else {
                        reject(new Error(`Shell process exited with code ${e.exitCode}`));
                    }
                });

            } catch (error) {
                console.log(error);
                vscode.window.showErrorMessage('Error occurred Keploy Record: ' + error);
                reject(error);
            }
        });
    } catch (error) {
        console.log(error);
        vscode.window.showErrorMessage('Error occurred Keploy Record: ' + error);
        throw error;
    }
}
