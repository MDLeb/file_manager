import state from "../state.js";
import fs from "node:fs";
import path from "node:path";

export const cat = async (filePath) => {
    const resPath = path.resolve(state.SELECTED_DIR, filePath);
    const readable = fs.createReadStream(resPath, {encoding: 'utf-8'});

    readable.on('data', (chunk) => {
        console.log(chunk);
    });

    await new Promise((resolve, reject) => {
        readable.on('end', () => {
            resolve();
        });

        readable.on('error', (error) => {
            reject(error);
        });
    });
}
