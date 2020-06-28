import { Webview } from "vscode";
import { Option } from "./language_options";
import { join } from "path";
import { readFileSync } from "fs";
import * as marked from "marked";

/**
 * Get documentation path of the given language.
 * @param language Programming language.
 * @param extensionPath context.extensionPath
 */
export function getDocPath(language: Option, extensionPath: string): string {
  const normalizedName = language.replace(/[^0-9A-Z]/i, "").toLowerCase();
  return join(
    extensionPath,
    "static",
    normalizedName
  );
}

/**
 * Show installation guide for the given language.
 * @param webView WebView object to display documentation.
 * @param language Which language to describe.
 * @param extensionPath context.extensionPath
 */
export function showDoc(webView: Webview, language: Option, extensionPath: string): void {
  const docPath = getDocPath(language, extensionPath);
  const readmePath = join(docPath, "README.md");
  const markdown = readFileSync(readmePath, "utf8");
  const html = marked(markdown, {
    baseUrl: "vscode-resource:" + docPath.replace(/\\/g, "/") + "/"
  });
  webView.html = html;
}
