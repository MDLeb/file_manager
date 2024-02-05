import path from "node:path";
import {createReadStream} from 'node:fs';
import {createHash} from 'node:crypto';
import state from "../state.js";

export const hash = async (fileName) => {
    const filePath = path.resolve(state.SELECTED_DIR, fileName);
    const hash = createHash('sha256');
    const readable = createReadStream(filePath, {encoding: 'utf-8'});
    let data;

    return new Promise((res, rej) => {
        readable.on('data', (chunk) => {
            hash.update(chunk);
        });
        readable.on('error', (err) => {
            rej(err)
        });
        readable.on('end', () => {
            data = hash.digest('hex');
            res(`Hash for ${fileName} is ${data}`)
        });
    })
}
