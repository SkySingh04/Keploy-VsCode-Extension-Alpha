const vscode = acquireVsCodeApi();
// const util = require('util');
// const { exec } = require('child_process');
// const os = require('os');
// const fs = require('fs');



// const execPromise = util.promisify(exec);
const progressDiv = document.getElementById('Progress');

// async function downloadAndUpdate(downloadUrl) {
//   try {
//     // Determine the path based on the alias "keploy"
//     let aliasPath = "/usr/local/bin/keploybin"; // Default path
//     const whichCmd = os.platform() === 'win32' ? 'where' : 'which';
//     const { stdout: aliasOutput } = await execPromise(`${whichCmd} keploy`);
//     if (aliasOutput.trim()) {
//       aliasPath = aliasOutput.trim();
//     }

//     // Check if the aliasPath is a valid path
//     try {
//       await fs.promises.access(aliasPath, fs.constants.F_OK);
//     } catch (err) {
//       throw new Error(`Alias path ${aliasPath} does not exist`);
//     }

//     // Check if the aliasPath is a directory
//     const aliasStats = await fs.promises.stat(aliasPath);
//     if (aliasStats.isDirectory()) {
//       throw new Error(`Alias path ${aliasPath} is a directory, not a file`);
//     }

//     // Download keploy binary
//     const curlCmd = `curl --silent --location ${downloadUrl}`;
//     const untarCmd = 'tar xz -C /tmp';
//     const downloadProcess = exec(curlCmd);
//     const untarProcess = exec(untarCmd);

//     // Pipe the output of the first command to the second command
//     downloadProcess.stdout.pipe(untarProcess.stdin);

//     await Promise.all([
//       new Promise((resolve, reject) => {
//         downloadProcess.on('exit', (code) => {
//           if (code === 0) {
//             resolve();
//           } else {
//             reject(new Error(`Download command failed with code ${code}`));
//           }
//         });
//       }),
//       new Promise((resolve, reject) => {
//         untarProcess.on('exit', (code) => {
//           if (code === 0) {
//             resolve();
//           } else {
//             reject(new Error(`Untar command failed with code ${code}`));
//           }
//         });
//       }),
//     ]);

//     // Move keploy binary to aliasPath
//     const moveCmd = `sudo mv /tmp/keploy ${aliasPath}`;
//     await execPromise(moveCmd);

//     console.log('Keploy binary updated successfully.');
//   } catch (error) {
//     console.error('Error updating Keploy binary:', error.message);
//   }
// }


async function getKeployVersion() {
  // GitHub repository details
  const repoOwner = "keploy";
  const repoName = "keploy";

  const apiURL =`https://api.github.com/repos/${repoOwner}/${repoName}/releases/latest`;

  // Get the latest release
  const response = await fetch(apiURL);
  const data = await response.json();
  const latestVersion = data.tag_name;
  return latestVersion;
}
// Create a function to update the version display
function updateVersionDisplay(version) {
  const versionDisplay = document.getElementById('versionDisplay');
  if (versionDisplay) {
    versionDisplay.innerHTML = `Latest version:
     <p>${version}</p>`;
  }
}

// Create a function to update Keploy
// async function keployUpdate() {
//   try {
//     // Call the getKeployVersion function
//     const version = await getKeployVersion();
//     if (version === undefined || version === null || version === "") {
//       throw new Error("No version found");
//     }
//     downloadUrl = "https://github.com/keploy/keploy/releases/latest/download/keploy_linux_amd64.tar.gz"
//     const response = await  downloadAndUpdate(downloadUrl)
//     if (response === undefined || response === null || response === "") {
//       throw new Error("Error Updating Keploy");
//     }


//   } catch (error) {
//     // Handle any errors that occur
//     vscode.postMessage({
//       type: "onError",
//       value: `Error getting Keploy version: ${error.message}`
//     });
//   }
// }


const getVersionButton = document.getElementById('getVersionButton');
if (getVersionButton) {
  getVersionButton.addEventListener('click', async () => {
    try {
      // Call the getKeployVersion function
      const version = await getKeployVersion();
      console.log(`The latest version of Keploy is ${version}`);
      // Update the version display
      updateVersionDisplay(version);
      // Post a message to the extension with the latest version
      vscode.postMessage({
        type: "onInfo",
        value: `The latest version of Keploy is ${version}`
      });
    } catch (error) {
      // Handle any errors that occur
      vscode.postMessage({
        type: "onError",
        value: `Error getting Keploy version: ${error.message}`
      });
    }
  });
}



const updateButton = document.getElementById('updateKeployButton');
if (updateButton) {
  updateButton.addEventListener('click', async () => {
    // Get the Progress div
    
    if (progressDiv) {
      // Set the text to "Updating"
      progressDiv.innerHTML = "<p class='info'>Feature is being worked on</p>";
    }
    // try {
    //   // Call the keployUpdate function
    //   await keployUpdate();
    //   if (progressDiv) {
    //     progressDiv.textContent = "<p class='success'>Updated</p>";
    //   }
    // } catch (error) {
    //   // If update fails, set the text to "Update failed"
    //   if (progressDiv) {
    //     progressDiv.textContent = "<p class='error'>Update failed</p>";
    //   }
    // }
  });
}







