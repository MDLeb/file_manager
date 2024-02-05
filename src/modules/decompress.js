import {createBrotliDecompress} from 'node:zlib';
import {pipeline } from 'node:stream';
import process from "node:process";
import {createReadStream, createWriteStream} from "node:fs";
import path from 'node:path';
import state from "../state.js";
import {finished} from 'node:stream/promises';

export const decompress = async (from, to) => {
    const filePath = path.resolve(state.SELECTED_DIR, from);
    const destPath = path.resolve(state.SELECTED_DIR, to);


    const decompress = createBrotliDecompress();
    const source = createReadStream(filePath);
    const destination = createWriteStream(destPath)

    pipeline(source, decompress, destination, (err) => {
        if (err) {
            return err;
        }
    });
    await finished(destination);
    return `File ${from} decompressed`

};

