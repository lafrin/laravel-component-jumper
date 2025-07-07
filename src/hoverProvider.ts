import { existsSync } from "fs";
import {
  HoverProvider as BaseHoverProvider,
  Hover,
  MarkdownString,
  Position,
  TextDocument,
  Uri,
  workspace,
  ProviderResult,
} from "vscode";
import { getAllPossiblePaths } from "./utils";

export default class HoverProvider implements BaseHoverProvider {
  public provideHover(
    doc: TextDocument,
    position: Position
  ): ProviderResult<Hover> {
    const config = workspace.getConfiguration("laravel_component_jumper");
    const regex = new RegExp(config.regex);
    
    const range = doc.getWordRangeAtPosition(position, regex);

    if (!range) {
      return;
    }

    const componentName = doc.getText(range);
    const workspacePath = workspace.getWorkspaceFolder(doc.uri)?.uri.fsPath;
    
    const possiblePaths = getAllPossiblePaths(componentName);
    
    let componentPath: string | null = null;
    for (const path of possiblePaths) {
      if (existsSync(workspacePath + path)) {
        componentPath = path;
        break;
      }
    }
    
    if (!componentPath) {
      return;
    }

    const lookUpUri = `[${componentPath}](${Uri.file(
      workspacePath + componentPath
    )})`;

    return new Hover(new MarkdownString(`*${componentName}*: ${lookUpUri}`));
  }
}
