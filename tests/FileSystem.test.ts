import { FileSystem } from "../src/main";

describe("FileSystem", () => {
  let fs: FileSystem;

  beforeEach(() => {
    fs = new FileSystem();
  });

  test("should initialize with root directory", () => {
    const children = fs.getChildren();
    expect(children).toEqual([]);
    expect(fs.getCurrentPath()).toBe("/");
  });

  test("should add a file to the current directory", () => {
    const result = fs.addFile("file1.txt", "Hello, World!");
    expect(result).toBe(true);

    const children = fs.getChildren();
    expect(children.length).toBe(1);
    expect(children[0]).toMatchObject({
      name: "file1.txt",
      type: "file",
      content: "Hello, World!",
    });
  });

  test("should not add a file with duplicate name", () => {
    fs.addFile("file1.txt", "Hello, World!");
    const result = fs.addFile("file1.txt", "Another content");
    expect(result).toBe(false);

    const children = fs.getChildren();
    expect(children.length).toBe(1);
  });

  test("should add a directory to the current directory", () => {
    const result = fs.addDirectory("dir1");
    expect(result).toBe(true);

    const children = fs.getChildren();
    expect(children.length).toBe(1);
    expect(children[0]).toMatchObject({
      name: "dir1",
      type: "directory",
      children: [],
    });
  });

  test("should not add a directory with duplicate name", () => {
    fs.addDirectory("dir1");
    const result = fs.addDirectory("dir1");
    expect(result).toBe(false);

    const children = fs.getChildren();
    expect(children.length).toBe(1);
  });

  test("should change the current directory", () => {
    fs.addDirectory("dir1");
    const result = fs.changeDirectory("dir1");
    expect(result).toBe(true);

    const children = fs.getChildren();
    expect(children).toEqual([]);
    expect(fs.getCurrentPath()).toBe("/dir1");
  });

  test("should not change to a non-existing directory", () => {
    const result = fs.changeDirectory("nonExistentDir");
    expect(result).toBe(false);

    const children = fs.getChildren();
    expect(children).toEqual([]);
    expect(fs.getCurrentPath()).toBe("/");
  });

  test("should navigate back to parent directory", () => {
    fs.addDirectory("dir1");
    fs.changeDirectory("dir1");
    const result = fs.changeDirectory("/");
    expect(result).toBe(true);

    const children = fs.getChildren();
    expect(children.length).toBe(1); // dir1 should still be there
    expect(fs.getCurrentPath()).toBe("/");
  });

  test("should handle .. for navigating up directories", () => {
    fs.addDirectory("dir1");
    fs.changeDirectory("dir1");
    fs.addDirectory("dir2");
    fs.changeDirectory("dir2");
    expect(fs.getCurrentPath()).toBe("/dir1/dir2");
    fs.changeDirectory("..");
    expect(fs.getCurrentPath()).toBe("/dir1");
    fs.changeDirectory("..");
    expect(fs.getCurrentPath()).toBe("/");
  });

  test("should handle ~ for navigating to root directory", () => {
    fs.addDirectory("dir1");
    fs.changeDirectory("dir1");
    fs.addDirectory("dir2");
    fs.changeDirectory("dir2");
    expect(fs.getCurrentPath()).toBe("/dir1/dir2");
    fs.changeDirectory("~");
    expect(fs.getCurrentPath()).toBe("/");
  });

  test("should add nested files and directories", () => {
    fs.addDirectory("dir1");
    fs.changeDirectory("dir1");
    fs.addDirectory("nestedDir");
    fs.addFile("nestedFile.txt", "Nested content");

    const nestedChildren = fs.getChildren();
    expect(nestedChildren.length).toBe(2);

    fs.changeDirectory("/");
    const rootChildren = fs.getChildren();
    expect(rootChildren.length).toBe(1);

    fs.changeDirectory("dir1");
    expect(fs.getCurrentPath()).toBe("/dir1");
  });
});
