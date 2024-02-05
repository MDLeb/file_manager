import state from "../state.js";
import path from "node:path";
import {finished} from 'node:stream/promises';
import {createReadStream} from 'node:fs';
import {createHash} from 'node:crypto';

export const hash = async (fileName) => {
    const filePath = path.resolve(state.SELECTED_DIR, fileName);
    const hash = createHash('sha256');
    const readable = createReadStream(filePath, {encoding: 'utf-8'});
    let data;

    readable.on('data', (chunk) => {
        hash.update(chunk);
    });
    readable.on('end', () => {
        data = hash.digest('hex');
    });
    await finished(readable);
    return `Hash for ${fileName} is ${data}`
}
