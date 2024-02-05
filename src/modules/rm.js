import state from "../state.js";
import fs from "node:fs";
import path from "node:path";

export const rm = async (filePath) => {
    const resPath = path.resolve(state.SELECTED_DIR, filePath);

    fs.rm(resPath, {recursive: true}, (err) => {
        if (err) return err;
        return `File ${filePath} removed!`
    });

}
