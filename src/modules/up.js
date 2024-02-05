import state from "../state.js";
import path from "node:path";

export const up = async () => {
    let {SELECTED_DIR} = state;
    const targetDir = path.parse(SELECTED_DIR).dir;
    state.setDirectory(targetDir);
    return;
}