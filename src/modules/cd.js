import fs from "node:fs";
import path from "node:path";
import state from "../state.js";

export const cd = async (targetPath) => {
    let resPath = path.resolve(state.SELECTED_DIR, targetPath);

    return new Promise((res, rej) => {
        fs.access(resPath, fs.constants.F_OK, (error) => {
            if (error) rej(error);
            else {
                fs.stat(resPath, (err, stats) => {
                    if (err) rej(err);
                    if (stats.isFile()) {
                        //если путь на файл, то переходим в его директорию
                        resPath = path.parse(resPath).dir;
                    }
                    state.setDirectory(resPath);
                    res();
                })
            }
        });
    })
}