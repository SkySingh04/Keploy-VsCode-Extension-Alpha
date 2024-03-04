import path from 'path';
import * as vscode from 'vscode';

//@ts-ignore
const requireFunc = typeof __webpack_require__ === "function" ? __non_webpack_require__ : require;
const moduleName = path.join(vscode.env.appRoot, "node_modules.asar", "node-pty");
export const spawn: typeof import('node-pty').spawn = requireFunc(moduleName).spawn; // null
console.log(require(moduleName)); // { native: { } }