import fs from "node:fs";
import path from 'node:path';
import {createBrotliCompress} from 'node:zlib';
import {pipeline} from 'node:stream';
import state from "../state.js";

export const compress = async (from, to) => {
    const filePath = path.resolve(state.SELECTED_DIR, from);
    let destPath = path.resolve(state.SELECTED_DIR, to);

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
                    //если конечный путь указан без расширения
                    if (!path.parse(destPath).ext) {
                        destPath += '.br';
                    }
                    const compress = createBrotliCompress();
                    const source = fs.createReadStream(filePath, {encoding: 'utf-8'});
                    const destination = fs.createWriteStream(destPath)

                    pipeline(source, compress, destination, (err) => {
                        if (err) rej(err);
                        res(`File ${from} compressed`)
                    });
                })
            }
        });
    })


};

