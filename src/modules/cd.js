import state from "../state.js";
import fs from "node:fs";
import path from "node:path";

export const cd = async (targetPath) => {
    const resPath = path.resolve(state.SELECTED_DIR, targetPath);

    try {
        await fs.promises.access(resPath, fs.constants.F_OK);
        state.setDirectory(resPath);
    } catch (error) {
        console.error(`Invalid input 3: ${error.message}`);
    }
}
