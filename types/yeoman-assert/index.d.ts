declare module 'yeoman-assert' {
  function file(path: string | Array<string>): void;
  function jsonFileContent(filename: string, content: {}): void;
}
