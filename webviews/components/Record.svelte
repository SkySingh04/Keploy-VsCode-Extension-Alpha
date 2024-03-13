

<script>
</script>

<body>
  <div id="selectFolderDiv">
    <button id="selectFolderButton" class="secondary"
      >Select Project Folder</button
    >
    <input
      type="text"
      id="projectFolder"
      name="projectFolder"
      placeholder="Enter Manual Path"
    />
  </div>
  <div id="appCommandDiv">
    <button id="enterAppCommandButton" disabled="true" class="secondary"
      >Enter App Command</button
    >
    <input
      type="text"
      id="recordCommand"
      name="recordCommand"
      placeholder="Enter App Command"
    />
  </div>
  <div id="flagsDiv">
    <div id="flags">
      <select id="selectflags">
        <option value="manual">Flag 1</option>
        <option value="record">Flag 2</option>
      </select>
    </div>
    <div id="flagValue">
      <select id="selectflagValue">
        <option value="manual">True</option>
        <option value="record">False</option>
      </select>
    </div>
  </div>
  <button id="startRecordingButton" disabled="true">Start Recording</button>
  
  <hr />
  <div id="outputDiv">
    <div id="upperOutputDiv">
      <img
        class="keploylogo"
        src="https://avatars.githubusercontent.com/u/92252339?s=200&v=4"
        alt="Keploy Logo"
      />
      <h3>Command</h3>
    </div>
    <div id="recordCommandDiv">
      <h1 id="generatedRecordCommand">keploy record -c ""</h1>
    </div>
    <div id="recordedTestCases"></div>
  </div>
</body>

<style>
  #flagsDiv,
  #upperOutputDiv {
    display: grid;
    grid-template-columns: 1fr 1fr;
    place-items: center;
  }
  .keploylogo {
    width: 50%;
  }
  hr {
    margin: 0;
    width: 80%;
    text-align: center;
    margin: 20px auto;
  }
  #startRecordingButton {
    margin: 20px auto;
  }
  button {
    margin: 10px;
    width: 75%;
    border-radius: 5px;
    border: none;
  }
  #selectFolderDiv,
  #appCommandDiv {
    display: grid;
    place-items: center;
  }
  #selectFolderDiv {
    margin: 20px;
  }

  input {
    width: 95%;
    margin: 10px;
  }
  #selectflags,
  #selectflagValue {
    width: 2fr;
    margin: auto 0;
  }
  #generatedRecordCommand{
    margin: 0 auto;
    text-align: center;
  }
</style>
