import state from "../state.js";
import fs from "node:fs";
import path from "node:path";
import {pipeline} from "node:stream/promises";
import {finished} from 'node:stream/promises';

export const mv = async (fileName, to) => {
    const fromPath = path.resolve(state.SELECTED_DIR, fileName);
    const toPath = path.resolve(state.SELECTED_DIR, to, path.parse(fromPath).base);

    const readStream = fs.createReadStream(fromPath, {encoding: 'utf-8'})
    const writeStream = fs.createWriteStream(toPath)

    await pipeline(
        readStream,
        writeStream,
    );
    await finished(readStream);
    fs.rm(fromPath, {recursive: true}, (err) => {
        if (err) throw err;
    });
}