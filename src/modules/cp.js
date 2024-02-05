import state from "../state.js";
import fs from "node:fs";
import path from "node:path";
import {pipeline} from "node:stream/promises";

export const cp = async (fileName, to) => {
    const fromPath = path.resolve(state.SELECTED_DIR, fileName);
    let toPath = path.resolve(state.SELECTED_DIR, to);

    return new Promise((res, rej) => {
        if (path.parse(fromPath).dir === toPath) {
            rej(new Error(`File ${fileName} already exists in ${toPath}`));
            return;
        }
        fs.access(fromPath, fs.constants.F_OK, async (error) => {
            if (error) rej(error);
            else {
                if (!fs.existsSync(toPath)) {
                    rej(new Error(`wrong directory path`));
                    return;
                }
                const targetPath = path.resolve(toPath, path.parse(fromPath).base);
                if (fs.existsSync(targetPath)) {
                    rej(new Error(`File ${fileName} already exists in ${toPath}`));
                    return;
                }
                fs.stat(fromPath, (err, stats) => {
                    if (err) rej(err);
                    if (!stats.isFile()) {
                        rej(new Error(`${fileName} is not a file`));
                        return;
                    }
                    fs.stat(toPath, (err, stats) => {
                        if (err) rej(err);
                        if (!stats.isDirectory()) {
                            //если 2 путь указывает не на папку
                            rej(new Error('invalid path to directory'));
                            return
                        }
                        const readStream = fs.createReadStream(fromPath, {encoding: 'utf-8'})
                        const writeStream = fs.createWriteStream(targetPath)

                        pipeline(readStream, writeStream);
                        readStream.on('end', (err) => {
                            if (err) rej(err);
                            res(`File ${fileName} was copied to ${toPath}`)
                        })
                    });

                })
            }
        });
    })
}
