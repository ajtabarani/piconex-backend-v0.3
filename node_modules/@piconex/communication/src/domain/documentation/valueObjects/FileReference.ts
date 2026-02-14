export default class FileReference {
  private readonly fileName: string;
  private readonly filePath: string;
  private readonly mimeType: string;
  private readonly fileSize: number;

  private readonly createdAt: Date;

  private constructor(
    fileName: string,
    filePath: string,
    mimeType: string,
    fileSize: number,
    createdAt: Date,
  ) {
    if (fileSize < 0) {
      throw new Error("File size cannot be negative");
    }

    this.fileName = fileName;
    this.filePath = filePath;
    this.mimeType = mimeType;
    this.fileSize = fileSize;
    this.createdAt = createdAt;
  }

  static create(
    fileName: string,
    filePath: string,
    mimeType: string,
    fileSize: number,
    createdAt: Date,
  ): FileReference {
    return new FileReference(fileName, filePath, mimeType, fileSize, createdAt);
  }

  getFileName(): string {
    return this.fileName;
  }

  getFilePath(): string {
    return this.filePath;
  }

  getMimeType(): string {
    return this.mimeType;
  }

  getFileSize(): number {
    return this.fileSize;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }
}
