import {createBrotliDecompress} from 'node:zlib';
import {pipeline} from 'node:stream';
import fs from "node:fs";
import path from 'node:path';
import state from "../state.js";

export const decompress = async (from, to) => {
    const filePath = path.resolve(state.SELECTED_DIR, from);
    const destPath = path.resolve(state.SELECTED_DIR, to);

    return new Promise((res, rej) => {
        fs.access(filePath, fs.constants.F_OK, (error) => {
            if (error) rej(error);
            else {
                fs.stat(filePath, (err, stats) => {
                    if (err) rej(err);
                    if (!stats.isFile()) {
                        //если путь указывает не на файл
                        rej(new Error('invalid path to file'));
                    }

                    const decompress = createBrotliDecompress();
                    const source = fs.createReadStream(filePath);
                    const destination = fs.createWriteStream(destPath)

                    pipeline(source, decompress, destination, (err) => {
                        if (err) rej(err);
                        res(`File ${from} decompressed`);
                    });
                })
            }
        });
    })
};

