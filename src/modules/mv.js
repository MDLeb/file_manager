import fs from "node:fs";
import path from "node:path";
import {pipeline} from "node:stream/promises";
import state from "../state.js";

export const mv = async (fileName, to) => {
    const fromPath = path.resolve(state.SELECTED_DIR, fileName);
    let toPath = path.resolve(state.SELECTED_DIR, `${to}/${path.parse(fromPath).base}`);

    return new Promise((res, rej) => {
        fs.access(fromPath, fs.constants.F_OK, (error) => {
            if (error) rej(error);
            else {
                fs.stat(fromPath, (err, stats) => {
                    if (err) rej(err);
                    if (!stats.isFile()) {
                        rej(new Error(`${fileName} is not a file`));
                        return;
                    }
                    const readStream = fs.createReadStream(fromPath, {encoding: 'utf-8'})
                    const writeStream = fs.createWriteStream(toPath)

                    pipeline(readStream, writeStream);
                    readStream.on('end', (err) => {
                        if (err) rej(err);
                        fs.rm(fromPath, {recursive: true}, (err) => {
                            if (err) rej(err);
                            res(`File ${fileName} was moved to ${toPath}`)
                        });
                    })
                })
            }
        });
    })
}
