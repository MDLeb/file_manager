import process from 'node:process';
import path from 'node:path';

export const getFilename = () => path.parse(process.argv[1]).base;
