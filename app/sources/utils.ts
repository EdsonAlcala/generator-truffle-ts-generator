import glob from 'glob';

export const globPromise = (pattern: string, opts: any): Promise<string[]> => {
  return new Promise((resolve, reject) => {
    glob(pattern, opts, (error: Error | null, files: string[]) => {
      if (error) {
        reject(error);
      }
      resolve(files);
    });
  });
};
