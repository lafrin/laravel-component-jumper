import { existsSync } from "fs";
import {
  DocumentLinkProvider,
  Hover,
  MarkdownString,
  Position,
  TextDocument,
  Uri,
  workspace,
  ProviderResult,
  DocumentLink,
  Range,
} from "vscode";
import { getAllPossiblePaths } from "./utils";

export default class LinkProvider implements DocumentLinkProvider {
  public provideDocumentLinks(
    doc: TextDocument
  ): ProviderResult<DocumentLink[]> {
    const documentLinks: DocumentLink[] = [];

    const config = workspace.getConfiguration("laravel_component_jumper");
    const workspacePath = workspace.getWorkspaceFolder(doc.uri)?.uri.fsPath;

    const reg = new RegExp(config.regex);
    let linesCount = doc.lineCount;

    let index = 0;
    while (index < linesCount) {
      let line = doc.lineAt(index);
      let result = line.text.match(reg);

      if (result !== null) {
        for (let componentName of result) {
          const possiblePaths = getAllPossiblePaths(componentName);
          
          let componentPath: string | null = null;
          for (const path of possiblePaths) {
            if (existsSync(workspacePath + path)) {
              componentPath = path;
              break;
            }
          }
          
          if (!componentPath) {
            continue;
          }
          
          let start = new Position(
            line.lineNumber,
            line.text.indexOf(componentName)
          );
          let end = start.translate(0, componentName.length);
          let documentlink = new DocumentLink(
            new Range(start, end),
            Uri.file(workspacePath + componentPath)
          );
          documentLinks.push(documentlink);
        }
      }

      index++;
    }

    return documentLinks;
  }
}
