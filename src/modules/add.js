import state from "../state.js";
import fs from "node:fs";
import path from "node:path";

export const add = async (filePath) => {
    const resPath = path.resolve(state.SELECTED_DIR, filePath);

    await fs.open(resPath, 'a', (err, fd) => {
        // => null, <fd>
    });
}
