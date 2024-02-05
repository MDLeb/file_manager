import fs from "node:fs";
import path from "node:path";
import state from "../state.js";

export const rm = async (filePath) => {
    const resPath = path.resolve(state.SELECTED_DIR, filePath);
    return new Promise((res, rej) => {
        fs.rm(resPath, {recursive: true}, (err) => {
            if (err) rej(err);
            res(`File ${filePath} removed!`)
        });
    })
}
