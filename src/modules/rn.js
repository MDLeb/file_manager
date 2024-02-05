import state from "../state.js";
import fs from "node:fs";
import path from "node:path";

export const rn = async (filePath, newName) => {
    const resPath = path.resolve(state.SELECTED_DIR, filePath);
    const newPath = path.resolve(state.SELECTED_DIR, newName);

    return new Promise((res, rej) => {
        fs.rename(resPath, newPath, (err) => {
            if (err) rej(err);
            res(`File ${filePath} renamed to ${newName}!`)
        });
    })
}
