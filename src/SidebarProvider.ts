import * as vscode from "vscode";
import { getNonce } from "./getNonce";
import { downloadAndUpdate } from './updateKeploy';
import { downloadAndUpdateDocker } from './updateKeploy';

export class SidebarProvider implements vscode.WebviewViewProvider {
  _view?: vscode.WebviewView;
  _doc?: vscode.TextDocument;

  constructor(private readonly _extensionUri: vscode.Uri) {}

  public resolveWebviewView(webviewView: vscode.WebviewView) {
    this._view = webviewView;

    webviewView.webview.options = {
      // Allow scripts in the webview
      enableScripts: true,

      localResourceRoots: [this._extensionUri],
    };

    webviewView.webview.html = this._getHtmlForWebview(webviewView.webview);

    webviewView.webview.onDidReceiveMessage(async (data) => {
      switch (data.type) {
        case "onInfo": {
          if (!data.value) {
            return;
          }
          vscode.window.showInformationMessage(data.value);
          break;
        }
        case "onError": {
          if (!data.value) {
            return;
          }
          vscode.window.showErrorMessage(data.value);
          break;
        }
        case "updateKeploy": {
          if (!data.value) {
            return;
          }
          try {
            await downloadAndUpdate("https://github.com/keploy/keploy/releases/latest/download/keploy_linux_amd64.tar.gz");
            this._view?.webview.postMessage({ type: 'success', value: 'Keploy binary updated!' });
          } catch (error) {
            this._view?.webview.postMessage({ type: 'error', value: `Failed to update Keploy binary: ${error}` });
          }
          break;
        }
        case "updateKeployDocker": {
          if (!data.value) {
            return;
          }
          try {
            await downloadAndUpdateDocker();
            this._view?.webview.postMessage({ type: 'success', value: 'Keploy Docker updated!' });
          } catch (error) {
            this._view?.webview.postMessage({ type: 'error', value: `Failed to update Keploy Docker ${error}` });
          }
          break;
      }
    }});
  }

  public revive(panel: vscode.WebviewView) {
    this._view = panel;
  }

  private _getHtmlForWebview(webview: vscode.Webview) {
    // const styleResetUri = webview.asWebviewUri(
    //   vscode.Uri.joinPath(this._extensionUri, "media", "reset.css")
    // );
    const scriptUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this._extensionUri, "./", "sidebar/sidebar.js")
    );
    const styleMainUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this._extensionUri, "./", "sidebar/sidebar.css")
    );
    // const styleVSCodeUri = webview.asWebviewUri(
    //   vscode.Uri.joinPath(this._extensionUri, "media", "vscode.css")
    // );

    // Use a nonce to only allow a specific script to be run.
    const nonce = getNonce();

    return `<!DOCTYPE html>
			<html lang="en">
			<head>
				<meta charset="UTF-8">
				<!--
					Use a content security policy to only allow loading images from https or from our extension directory,
					and only allow scripts that have a specific nonce.
        -->
        <meta http-equiv="Content-Security-Policy" content="img-src https: data:; style-src 'unsafe-inline' ${
      webview.cspSource
    }; script-src 'nonce-${nonce}';">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
       <link href="${styleMainUri}" rel="stylesheet">
       <link rel="stylesheet" type='text/css' href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css" />
        
        	</head>
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
      </pre></p>
      <div id="versionDisplay"></div>
      <div id="Progress"></div>
      <div id=utilityButtons>
      <button id="getVersionButton">Get latest version</button>
      <button id="updateKeployButton">Update Your Keploy</button>
      </div>
      <div id="osButtons">
        <button id="updateKeployLinuxButton">
        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-plain.svg" />
      </button>
        <button id="updateKeployWindowsButton">
        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/windows11/windows11-original.svg" />
        </button>
        <button id="updateKeployMacButton">
        
        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/apple/apple-original.svg" />
        </button>
      </div>
      <div id="additionalUpdateButtons">
          <button id="updateKeployDockerButton">Update Keploy Docker</button>
          <button id="updateKeployBinaryButton">Update Keploy Binary</button>
      </div>
      <div id="updateStatus"></div>
      
				<script nonce="${nonce}" src="${scriptUri}" type="module"></script>
			</body>
			</html>`;
  }
}
