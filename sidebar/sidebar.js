const vscode = acquireVsCodeApi();
const progressDiv = document.getElementById('Progress');

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
    const osbuttonDiv = document.getElementById('osButtons');
    if (osbuttonDiv) {
      if (osbuttonDiv.style.display === "grid") {
        osbuttonDiv.style.display = "none";
      }
      else {
        osbuttonDiv.style.display = "grid";
      }
    }
    const additionalUpdateButtons = document.getElementById('additionalUpdateButtons');
    if (additionalUpdateButtons) {
      if (additionalUpdateButtons.style.display === "grid") {
        additionalUpdateButtons.style.display = "none";
      }
      else {
        additionalUpdateButtons.style.display = "grid";
      }
    }

    // vscode.postMessage({
    //   type: "updateKeploy",
    //   value: `Updating Keploy...`
    // });
  });
}


const updateKeployLinuxButton =  document.getElementById('updateKeployLinuxButton');
if (updateKeployLinuxButton) {
  updateKeployLinuxButton.addEventListener('click', async () => {
    console.log("updateKeployLinuxButton clicked");
    // Get the Progress div
    const updateKeployDockerButton = document.getElementById('updateKeployDockerButton');
    const updateKeployBinaryButton = document.getElementById('updateKeployBinaryButton');
    updateKeployBinaryButton.style.display = "block";
    updateKeployDockerButton.style.display = "block";
  });
}
const updateKeployWindowsButton =  document.getElementById('updateKeployWindowsButton');
if (updateKeployWindowsButton) {
  updateKeployWindowsButton.addEventListener('click', async () => {
    console.log("updateKeployWindowsButton clicked");
    // Get the Progress div
    const updateKeployDockerButton = document.getElementById('updateKeployDockerButton');
    const updateKeployBinaryButton = document.getElementById('updateKeployBinaryButton');
    updateKeployBinaryButton.style.display = "block";
    updateKeployDockerButton.style.display = "block";
  });
}
const updateKeployMacButton =  document.getElementById('updateKeployMacButton');
if (updateKeployMacButton) {
  updateKeployMacButton.addEventListener('click', async () => {
    console.log("updateKeployWindowsButton clicked");
    // Get the Progress div
    const updateKeployDockerButton = document.getElementById('updateKeployDockerButton');
    const updateKeployBinaryButton = document.getElementById('updateKeployBinaryButton');
    updateKeployBinaryButton.style.display = "none";
    updateKeployDockerButton.style.display = "block";
  });
}


const updateKeployBinaryButton = document.getElementById('updateKeployBinaryButton');
if (updateKeployBinaryButton) {
  updateKeployBinaryButton.addEventListener('click', async () => {
    console.log("updateKeployBinaryButton clicked");
    // Get the Progress div
    
    // if (progressDiv) {
    //   // Set the text to "Updating"
    //   progressDiv.innerHTML = "<p class='info'>Feature is being worked on</p>";
    // }
    vscode.postMessage({
      type: "updateKeploy",
      value: `Updating Keploy...`
    });
  })
}

const updateKeployDockerButton = document.getElementById('updateKeployDockerButton');
if (updateKeployDockerButton) {
  updateKeployDockerButton.addEventListener('click', async () => {
    console.log("updateKeployDockerButton clicked");
    // Get the Progress div
    vscode.postMessage({
      type: "updateKeployDocker",
      value: `Updating Keploy Docker...`
    });
  })
}

// Handle messages sent from the extension
window.addEventListener('message', event => {
  const message = event.data;
  console.log("message", message);
  if (message.type === 'updateStatus') {
      console.log("message.value", message.value);
      progressDiv.innerHTML = `<p class="info">${message.value}</p>`;
  }
  else if (message.type === 'error') {
    console.error(message.value);
    progressDiv.innerHTML = `<p class="error">${message.value}</p>`;
  }
  else if (message.type === 'success') {
    console.log(message.value);
    progressDiv.innerHTML = `<p class="success">${message.value}</p>`;
  }
});






