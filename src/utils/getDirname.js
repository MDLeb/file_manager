import process from 'node:process';
import path from 'node:path';

export const getDirname = () => path.parse(process.argv[1]).dir;