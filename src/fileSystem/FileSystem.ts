import { IFile, IDirectory, FileSystemNode } from "./types";

export class FileSystem {
  private readonly root: IDirectory;
  private currentDir: IDirectory;

  constructor() {
    this.root = this.createDirectory("/");
    this.currentDir = this.root;
  }

  private createFile(name: string, content: string): IFile {
    return { name, type: "file", content };
  }

  private createDirectory(name: string): IDirectory {
    return { name, type: "directory", children: [] };
  }

  public addFile(name: string, content: string): boolean {
    if (this.nodeExists(name)) {
      console.error(`A node named '${name}' already exists.`);
      return false;
    }
    const file = this.createFile(name, content);
    this.currentDir.children.push(file);
    return true;
  }

  public addDirectory(name: string): boolean {
    if (this.nodeExists(name)) {
      console.error(`A node named '${name}' already exists.`);
      return false;
    }
    const directory = this.createDirectory(name);
    this.currentDir.children.push(directory);
    return true;
  }

  public getChildren(): FileSystemNode[] {
    return this.currentDir.children;
  }

  public changeDirectory(path: string): boolean {
    const targetNode = this.getNodeByPath(path);
    if (targetNode && targetNode.type === "directory") {
      this.currentDir = targetNode;
      return true;
    }
    console.error(`Directory '${path}' not found.`);
    return false;
  }

  public getCurrentPath(): string {
    const path: string[] = [];
    let current: IDirectory | null = this.currentDir;

    while (current && current.name !== "/") {
      path.unshift(current.name);
      current = this.getParentDirectory(current);
    }

    // Add root directory if path is not empty
    if (path.length === 0) {
      path.push("");
    }

    path.unshift(""); // To handle leading slash
    return path.join("/");
  }

  private getParentDirectory(node: IDirectory): IDirectory | null {
    const findParent = (
      parent: IDirectory,
      target: IDirectory
    ): IDirectory | null => {
      for (const child of parent.children) {
        if (child === target) return parent;
        if (child.type === "directory") {
          const result = findParent(child, target);
          if (result) return result;
        }
      }
      return null;
    };
    return findParent(this.root, node);
  }

  private nodeExists(name: string): boolean {
    return this.currentDir.children.some((child) => child.name === name);
  }

  private getNodeByPath(path: string): FileSystemNode | null {
    if (path === "~") return this.root;
    if (path.startsWith("/")) return this.getNodeByAbsolutePath(path);

    const parts = path.split("/").filter((p) => p.length);
    let currentNode: FileSystemNode | null = this.currentDir;

    for (const part of parts) {
      if (part === "..") {
        currentNode = this.getParentDirectory(currentNode as IDirectory);
        if (!currentNode) return null;
      } else {
        if (currentNode?.type !== "directory") return null;
        const nextNode: FileSystemNode | undefined = currentNode.children.find(
          (child) => child.name === part
        );
        if (!nextNode) return null;
        currentNode = nextNode;
      }
    }
    return currentNode;
  }

  private getNodeByAbsolutePath(path: string): FileSystemNode | null {
    if (path === "/") return this.root;

    const parts = path.split("/").filter((p) => p.length);
    let currentNode: FileSystemNode | null = this.root;

    for (const part of parts) {
      if (currentNode?.type !== "directory") return null;
      const nextNode: FileSystemNode | undefined = currentNode.children.find(
        (child) => child.name === part
      );
      if (!nextNode) return null;
      currentNode = nextNode;
    }
    return currentNode;
  }
}
