import util from 'util';
import { exec, spawn, spawnSync } from 'child_process';
import os from 'os';
import fs from 'fs';
const execPromise = util.promisify(exec);



export async function downloadAndUpdate(downloadUrl: string) {
    try {
      // Determine the path based on the alias "keploy"
      let aliasPath = "/usr/local/bin/keploybin"; // Default path
    //   child.stdout.pipe(process.stdout);
    //   child.stderr.pipe(process.stderr);
  
    //   // Check if the aliasPath is a valid path
    //   try {
    //     await fs.promises.access(aliasPath, fs.constants.F_OK);
    //   } catch (err) {
    //     throw new Error(`Alias path ${aliasPath} does not exist`);
    //   }
  
    //   // Check if the aliasPath is a directory
    //   const aliasStats = await fs.promises.stat(aliasPath);
    //   if (aliasStats.isDirectory()) {
    //     throw new Error(`Alias path ${aliasPath} is a directory, not a file`);
    //   }
  
      // Download keploy binary
      const curlCmd = `curl --silent --location ${downloadUrl} | tar xz -C /tmp &&  mv /tmp/keploy ${aliasPath}`;
      const untarCmd = 'tar xz -C /tmp';
      let child = spawnSync("ubuntu", [ "bash", "-l", "-c", curlCmd ], {
        shell: true
      });
    //   const downloadProcess = exec(curlCmd);
    //   const untarProcess = exec(untarCmd);
    console.log(child.stdout.toString())
    console.log(child.stderr.toString())
  
    //   // Pipe the output of the first command to the second command
    //   if (!downloadProcess.stdout || !untarProcess.stdin) {
    //     throw new Error('Failed to pipe commands');
    //   }
    //   downloadProcess.stdout.pipe(untarProcess.stdin);
  
    //   await Promise.all([
    //     new Promise<void>((resolve, reject) => {
    //         downloadProcess.on('exit', (code:any) => {
    //             if (code === 0) {
    //                 resolve(undefined);
    //             } else {
    //                 reject(new Error(`Download command failed with code ${code}`));
    //             }
    //         });
    //     }),
    //     new Promise((resolve, reject) => {
    //       untarProcess.on('exit', (code:any) => {
    //         if (code === 0) {
    //           resolve(undefined);
    //         } else {
    //           reject(new Error(`Untar command failed with code ${code}`));
    //         }
    //       });
    //     }),
    //   ]);
  
    //   // Move keploy binary to aliasPath
    //   const moveCmd = `sudo mv /tmp/keploy ${aliasPath}`;
    //   await execPromise(moveCmd);
    //   await new Promise((resolve, reject) => {
    //     child.on('exit', (code:any) => {
    //       if (code === 0) {
    //         resolve(undefined);
    //       } else {
    //         reject(new Error(`Download command failed with code ${code}`));
    //       }
    //     });
    //   });
  
      console.log('Keploy binary updated successfully.');
    } catch (error:any) {
      console.error('Error updating Keploy binary:', error.message);
    }
  }