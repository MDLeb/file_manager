import state from "../state.js";
import fs from "node:fs";
import path from "node:path";

export const add = async (filePath) => {
    const resPath = path.resolve(state.SELECTED_DIR, filePath);

    return new Promise((res, rej) => {
        fs.open(resPath, 'ax', (err) => {
            if (err) rej(err);
            res(`File ${resPath} added successfully`);
        });
    })

}
