import state from "../state.js";
import fs from "node:fs";
import path from "node:path";

export const cat = async (filePath) => {
    const resPath = path.resolve(state.SELECTED_DIR, filePath);

    return new Promise((res, rej) => {
        fs.access(resPath, fs.constants.F_OK, (error) => {
            if (error) rej(error);
            else {
                fs.stat(resPath, (err, stats) => {
                    if (err) rej(err);
                    if (!stats.isFile()) {
                        //если путь указывает не на файл
                        rej(new Error('invalid path to file'));
                    }
                    const readable = fs.createReadStream(resPath, {encoding: 'utf-8'});

                    let data = '';
                    readable.on('data', (chunk) => {
                        data += chunk;
                    });
                    readable.on('error', (error) => {
                        return (error.message);
                    });
                    readable.on('end', (error) => {
                        if(error) rej(error);
                        res(data);
                    });
                })
            }
        });
    })
}
