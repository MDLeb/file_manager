import fs from "node:fs";
import path from 'node:path';
import {createBrotliCompress} from 'node:zlib';
import {pipeline} from 'node:stream';
import state from "../state.js";

export const compress = async (from, to) => {
    if (!to) throw new Error('Wrong destination path');
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

                        fs.stat(destPath, (err, stats) => {
                            if (err) rej(err);
                            if (!stats.isDirectory()) {
                                //если 2 путь указывает не на папку
                                rej(new Error('invalid path to directory'));
                            }

                            const fileName = path.resolve(destPath, `${path.parse(filePath).base}.br`)
                            const compress = createBrotliCompress();
                            const source = fs.createReadStream(filePath, {encoding: 'utf-8'});
                            const destination = fs.createWriteStream(fileName)

                            pipeline(source, compress, destination, (err) => {
                                if (err) rej(err);
                                res(`File ${from} compressed`)
                            });
                        })
                    })
                }
            }
        )
    })
};

