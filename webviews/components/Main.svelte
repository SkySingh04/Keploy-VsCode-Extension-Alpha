<script>
    
  </script>
  <body>
    <p class="logo"><pre>
      ▓██▓▄
    ▓▓▓▓██▓█▓▄
      ████████▓▒
            ▀▓▓███▄                   
          ▄▌▌▓▓████▄    
        ▓█████████▌▓▓   
        ▓▓▓▓▀▀▀▀▓▓▓▓▓▓▌  
        ▓▌                      
        ▓
    </pre>
    <div id="versionDisplay"></div>
    <div id="Progress"></div>
    <div id="filePathDiv"></div>
    <div id="commandInput">
    <label for="command">Enter App Command:</label> 
    <input type="text" id="command" name="command" />
    <div id="recordedTestCases"></div>
    <button id="startRecordingButton">Start Recording</button> 
    </div>
    <div id=utilityButtons>
      <button id="getVersionButton">Get latest version</button>
      <button id="updateKeployButton">Update Your Keploy</button>
      <button id="recordButton">Record Test Cases</button>
    </div>
    <div id="osButtons">
      <button id="updateKeployLinuxButton">
        <img alt="" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-plain.svg" />
      </button>
      <button id="updateKeployWindowsButton">
        <img alt="" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/windows11/windows11-original.svg" />
      </button>
      <button id="updateKeployMacButton">
        <img alt="" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/apple/apple-original.svg" />
      </button>
    </div>
    <div id="additionalUpdateButtons">
      <button id="updateKeployDockerButton">Update Keploy Docker</button>
      <button id="updateKeployBinaryButton">Update Keploy Binary</button>
    </div>
    <div id="updateStatus"></div>
    <div id="recordStatus">

    </div>
  </body>
