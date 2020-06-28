import * as vscode from 'vscode';
import { options } from "./language_options";

let helpButton: vscode.StatusBarItem;

// Command ID
// Command for showing all available language guides.
const COMMAND_ID = "polyglot-hello-world.show";

export function activate({ subscriptions }: vscode.ExtensionContext) {
	// register a command that is invoked when the status bar
	// item is selected
	subscriptions.push(vscode.commands.registerCommand(COMMAND_ID, () => {
		vscode.window.showInformationMessage("Get Started Button Clicked!");
		vscode.window.showQuickPick([...options]).then(value => {
			vscode.window.showInformationMessage(`Get Started with ${value}`);
		});
	}));

	// create a new status bar item that we can now manage
	helpButton = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
	helpButton.command = COMMAND_ID;
	subscriptions.push(helpButton);
	helpButton.text = `$(megaphone) Get Started`;
	helpButton.show();
}
