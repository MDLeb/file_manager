import * as readline from 'node:readline/promises';
import path from 'node:path';
import fs from 'node:fs';
import {stdin, stdout} from 'node:process';
import {getMessage} from "./utils/getMessage.js";
import {getDirname} from "./utils/getDirname.js";

const startManager = async () => {
    const rl = readline.createInterface({input: stdin, output: stdout});
    console.log(getMessage('start'))
    rl.setPrompt(getMessage('directory'));

    rl.prompt();
    rl.on('line', (input) => {
        if (input === '.exit') {
            rl.close();
        } else {
            const [cmd, ...args] = input.split(' ');
            const moduleName = cmd + '.js';
            const modulePath = path.resolve(getDirname(), 'modules', moduleName);

            fs.access(modulePath, fs.constants.F_OK, (err) => {
                if (!err) {
                    import(`file://${modulePath}`)
                        .then(async (module) => {
                            await module[cmd](...args);
                            rl.setPrompt(getMessage('directory'));
                            rl.prompt();
                        })
                        .catch((error) => {
                            console.error(`Invalid input 1: ${error}`);
                        });
                } else {
                    console.error(`Invalid input 2`);
                }
            });
        }
    });

    rl.on('close', () => {
        console.log(getMessage('finish'))
    });
}

await startManager();