import * as vscode from 'vscode';
import {exec} from 'child_process';
import * as os from 'os';
import { execShell } from './execShell';
import path from 'path';
export async function startRecording(command: string , filepath: string , scriptPath: string , logfilePath : string): Promise<void> {
    console.log("Somehiw reached till here yay");
    console.log(command);
    console.log(filepath);
    try{
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
                // Spawn a new shell process using node-pty                // Create a new terminal instance with the Bash shell
                const terminal = vscode.window.createTerminal({
                    name: 'Keploy Terminal',
                    shellPath: bashPath,
                });

                // Show the terminal
                terminal.show();
                // const scriptPath = path.join(__dirname, 'keploy_record.sh');
                console.log(scriptPath);
                
                const recordCmd = `sudo ${scriptPath} ${command} "${filepath}" ${logfilePath}`;
                console.log(recordCmd);
                const executeCommand = async (command: string) => {
                    return new Promise<void>((resolve, reject) => {
                        terminal.sendText(command);
                        resolve();
                        vscode.window.onDidCloseTerminal(t => {
                            if (t.exitStatus && t.exitStatus.code) {
                                vscode.window.showInformationMessage(`Exit code: ${t.exitStatus.code}`);
                                console.log(`Exit code: ${t.exitStatus.code}`);
                            }
                            ;
                          });
                    });
                };
                Promise.all([executeCommand(recordCmd)]).then(() => {
                    resolve();
                }).catch(error => {
                    reject(error);
                }
                )
            } catch (error) {
                console.log(error);
                vscode.window.showErrorMessage('Error occurred Keplo Record: ' + error);
                reject(error);
            }
        })
    }
    catch(error){
        console.log(error);
        vscode.window.showErrorMessage('Error occurred Keplo Record: ' + error);
        throw error;    
    }
}

