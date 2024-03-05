const vscode = acquireVsCodeApi();
const progressDiv = document.getElementById('Progress');
const commandInput = document.getElementById('commandInput');
const filePathDiv = document.getElementById('filePathDiv');
const recordedTestCasesDiv = document.getElementById('recordedTestCases');
const stopRecordingButton = document.getElementById("stopRecordingButton");
const startRecordingButton = document.getElementById('startRecordingButton');
let recordFilePath = "";

const recordButton = document.getElementById('recordButton');
if (recordButton) {
  handleRecordButtonClick();
}
async function handleRecordButtonClick() {
  if (recordButton) {
    recordButton.addEventListener('click', async () => {
      console.log("recordButton clicked");
      vscode.postMessage({
        type: "record",
        value: "Recording..."
      });
    });
  }
}



async function getKeployVersion() {
  // GitHub repository details
  const repoOwner = "keploy";
  const repoName = "keploy";

  const apiURL = `https://api.github.com/repos/${repoOwner}/${repoName}/releases/latest`;

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
  });
}


const updateKeployLinuxButton = document.getElementById('updateKeployLinuxButton');
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
const updateKeployWindowsButton = document.getElementById('updateKeployWindowsButton');
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
const updateKeployMacButton = document.getElementById('updateKeployMacButton');
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
  });
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
  });
}


if (startRecordingButton) {
  const commandInput = document.getElementById('command');
  startRecordingButton.addEventListener('click', async () => {
    console.log("startRecordingButton clicked");
    stopRecordingButton.style.display = 'block';
    
    const commandValue = commandInput.value;
    console.log('Command value:', commandValue);
    // Get the Progress div
    vscode.postMessage({
      type: "startRecordingCommand",
      value: `Recording Command...`,
      command: commandValue,
      filePath: recordFilePath
    });
  });
}
if(stopRecordingButton){
  stopRecordingButton.addEventListener('click', async () => {
    console.log("stopRecordingButton clicked");
    // Get the Progress div
    vscode.postMessage({
      type: "stopRecordingCommand",
      value: `Stop Recording`
    });
  });
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
  else if (message.type === 'file') {
    console.log(message.value);
    if (filePathDiv) {
      filePathDiv.innerHTML = `<p class="info">Your Selected File is <br/> ${message.value}</p>`;
      recordFilePath = message.value;
    }
    if (commandInput) {
      commandInput.style.display = "block";
    }
  }
  else if (message.type === 'testcaserecorded') {
    console.log("message.textContent", message.textContent);
    const testCaseElement = document.createElement('p');
    testCaseElement.textContent = message.textContent;
    recordedTestCasesDiv.appendChild(testCaseElement); // Append the testCaseElement itself instead of its text content
  }

  // else if (message.type === "writeRecord") {
  //   const recordedTestCasesDiv = document.getElementById('recordedTestCases');
  //   const logFilePath = message.logFilePath;
  //   // read the logFile to get the test cases adn then display it to the user
  //   try {
  //     // Read the log file
  //     const logData = readFileSync(logFilePath, 'utf8');

  //     // Split the log data into lines
  //     const logLines = logData.split('\n');

  //     // Filter out the lines containing the desired information
  //     const capturedTestLines = logLines.filter(line => line.includes('🟠 Keploy has captured test cases'));

  //     // Display the captured test cases in your frontend
  //     capturedTestLines.forEach(testLine => {
  //       const testCaseInfo = JSON.parse(testLine.substring(testLine.indexOf('{')));
  //       const testCaseElement = document.createElement('div');
  //       testCaseElement.textContent = `Test case "${testCaseInfo['testcase name']}" captured at ${testCaseInfo.path}`;
  //       recordedTestCasesDiv.appendChild(testCaseElement);
  //     });
  //   } catch (err) {
  //     console.error('Error reading log file:', err);
  //   }
  // }
});






