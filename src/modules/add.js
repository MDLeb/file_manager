import fs from "node:fs";
import path from "node:path";
import state from "../state.js";

export const add = async (filePath) => {
    const resPath = path.resolve(state.SELECTED_DIR, filePath);

    return new Promise((res, rej) => {
        fs.open(resPath, 'wx+', (err, fd) => {
            if (err) {
                rej(err);
                return;
            }

            fs.close(fd, (closeErr) => {
                if (closeErr) {
                    rej(closeErr);
                    return;
                }
                res(`File ${resPath} was added successfully`);
            });
        });
    });
};

