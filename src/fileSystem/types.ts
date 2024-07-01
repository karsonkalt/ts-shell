export interface IFile {
  name: string;
  content: string;
  type: "file";
}

export interface IDirectory {
  name: string;
  children: (IFile | IDirectory)[];
  type: "directory";
}

export type FileSystemNode = IFile | IDirectory;
