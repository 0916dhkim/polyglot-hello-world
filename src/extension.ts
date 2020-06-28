import * as vscode from 'vscode';
import { options, Option } from "./language_options";
import { showDoc } from "./show_doc";
import { join } from "path";

let helpButton: vscode.StatusBarItem;

// Command ID
// Command for showing all available language guides.
const COMMAND_ID = "polyglot-hello-world.show";

export function activate({ subscriptions, extensionPath }: vscode.ExtensionContext) {
	// register a command that is invoked when the status bar
	// item is selected
	subscriptions.push(vscode.commands.registerCommand(COMMAND_ID, () => {
		vscode.window.showQuickPick([...options]).then(value => {
			const language = value as Option;
			const panel = vscode.window.createWebviewPanel(
				"setup-instruction",
				`${value} Setup`,
				vscode.ViewColumn.Active,
				{
					localResourceRoots: [vscode.Uri.file(join(extensionPath, "static"))]
				}
			);
			showDoc(panel.webview, language, extensionPath);
		});
	}));

	// create a new status bar item that we can now manage
	helpButton = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
	helpButton.command = COMMAND_ID;
	subscriptions.push(helpButton);
	helpButton.text = `$(megaphone) Get Started`;
	helpButton.show();
}
