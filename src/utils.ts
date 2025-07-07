import { workspace } from "vscode";

export function nameToPath(path: string, basePath: string): string {
  return `${basePath}/components/${path.replace(/\./g, "/")}.blade.php`;
}

export function nameToIndexPath(path: string, basePath: string): string {
  return `${basePath}/components/${path.replace(/\./g, "/")}/index.blade.php`;
}

export function getAllPossiblePaths(path: string): string[] {
  const config = workspace.getConfiguration("laravel_component_jumper");
  const searchPath = config.get<string>("searchPath", "/resources/views");
  
  return [
    nameToPath(path, searchPath),
    nameToIndexPath(path, searchPath)
  ];
}