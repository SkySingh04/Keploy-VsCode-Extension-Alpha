import * as vscode from 'vscode';

export async function downloadAndUpdate(downloadUrl: string) {
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
        terminal.sendText(curlCmd);
        terminal.sendText(moveCmd);
        // Display an information message
        vscode.window.showInformationMessage('Downloading and updating Keploy binary...');
    } catch (error:any) {
        console.error('Error updating Keploy binary:', error.message);
    }
}


// import util from 'util';
// import { exec, spawn, spawnSync } from 'child_process';
// import os from 'os';
// import fs from 'fs';
// const execPromise = util.promisify(exec);

// export async function downloadAndUpdate(downloadUrl: string) {


  
// //       // Download keploy binary
// //       
// //       // const curlCmd = ` curl -O https://raw.githubusercontent.com/keploy/keploy/main/keploy.sh && source keploy.sh`;
// //       // const curlCmd = `curl -O https://raw.githubusercontent.com/keploy/keploy/main/keploy.sh && bash keploy.sh`;
// //       // const untarCmd = 'tar xz -C /tmp';
// //       // let child = spawnSync("wsl", [ "bash", "-l", "-c", curlCmd ], {
// //         // shell: true
// //       // });
// //       // const downloadProcess = exec(curlCmd, (error, stdout, stderr) => {
// //       //   if (error) {
// //       //     console.error(`exec error: ${error}`);
// //       //     return;
// //       //   }
// //       //   console.log(`stdout: ${stdout}`);
// //       //   console.error(`stderr: ${stderr}`);
// //       // });
// //     //   const untarProcess = exec(untarCmd);
// //     // console.log(child.stdout.toString())
// //     // console.log(child.stderr.toString())
      
// //     //   // Pipe the output of the first command to the second command
// //     //   if (!downloadProcess.stdout || !untarProcess.stdin) {
// //     //     throw new Error('Failed to pipe commands');
// //     //   }
// //     //   downloadProcess.stdout.pipe(untarProcess.stdin);
  
// //     //   await Promise.all([
// //     //     new Promise<void>((resolve, reject) => {
// //     //         downloadProcess.on('exit', (code:any) => {
// //     //             if (code === 0) {
// //     //                 resolve(undefined);
// //     //             } else {
// //     //                 reject(new Error(`Download command failed with code ${code}`));
// //     //             }
// //     //         });
// //     //     }),
// //     //     new Promise((resolve, reject) => {
// //     //       untarProcess.on('exit', (code:any) => {
// //     //         if (code === 0) {
// //     //           resolve(undefined);
// //     //         } else {
// //     //           reject(new Error(`Untar command failed with code ${code}`));
// //     //         }
// //     //       });
// //     //     }),
// //     //   ]);
  
// //     //   // Move keploy binary to aliasPath

// //     //   await execPromise(moveCmd);
// //     //   await new Promise((resolve, reject) => {
// //     //     child.on('exit', (code:any) => {
// //     //       if (code === 0) {
// //     //         resolve(undefined);
// //     //       } else {
// //     //         reject(new Error(`Download command failed with code ${code}`));
// //     //       }
// //     //     });
// //     //   });
  
// //       console.log('Keploy binary updated successfully.');
// //     } catch (error:any) {
// //       console.error('Error updating Keploy binary:', error.message);
// //     }
// //   }

