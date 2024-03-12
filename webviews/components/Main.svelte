<script>
    import { onMount } from "svelte";
    let lastTestResults;
  onMount(()=>{
    lastTestResults.innerText = 'Feature not implemented yet.';
  })
</script>
<style>
  #topGrid {
    display: grid;
    place-items: center;
    grid-template-columns: 1fr 1fr;
  }
  #topGrid img {
    width: 50%;
  }
  #buttonsDiv {
    display: grid;
    place-items: center;
  }
  #lastTestResults {
    display: grid;
    place-items: center;
    margin: 20px auto;
  }
  hr{
    margin: 0;
    width: 80%;
    text-align: center;
    margin: 20px auto ;
  }
</style>
<body>
  <div id="topGrid">
    <img src="https://avatars.githubusercontent.com/u/92252339?s=200&v=4" alt="Keploy Logo" />
    <div class="lastTestResultsContainer">
      <h2>Last Test Results</h2>
      <div id="lastTestResults" bind:this={lastTestResults}></div>
      </div>
  </div>
  <hr />
  <div id="buttonsDiv">
    <button id="recordButton">Record Test Cases</button>
  <button id="testButton">Run Test Cases</button>
  <button id="runCustomCommandButton" disabled=true>Run Custom Command</button>

  </div>
  
</body>