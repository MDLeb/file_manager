import state from "../state.js";
import fs from "node:fs";
import path from "node:path";
import {finished} from 'node:stream/promises';

export const cat = async (filePath) => {
    const resPath = path.resolve(state.SELECTED_DIR, filePath);

    //FIXME handle error if path to directory
    const readable = fs.createReadStream(resPath, {encoding: 'utf-8'});

    let data = '';
    readable.on('data', (chunk) => {
        data += chunk;
    });

    readable.on('error', (error) => {
        return (error.message);
    });
    await finished(readable);
    return (data);
}
