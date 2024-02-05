import * as readline from 'node:readline/promises';
import path from 'node:path';
import fs from 'node:fs';
import {stdin, stdout} from 'node:process';
import {getMessage} from "./utils/getMessage.js";
import {getDirname} from "./utils/getDirname.js";
import {isString} from "./utils/isString.js";
import {isArray} from "./utils/isArray.js";
import {getErrorMessage} from "./utils/getErrorMessage.js";

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
                            try {
                                let result = await module[cmd](...args);

                                result && isArray(result) && console.table(result);
                                result && isString(result) && console.log(result);

                                rl.setPrompt(getMessage('directory'));
                            } catch (error) {
                                rl.setPrompt(getMessage('error', getErrorMessage(error)) + getMessage('directory'));
                            }
                            rl.prompt();
                        })
                } else {
                    rl.setPrompt(getMessage('cli_error'));
                    rl.prompt();
                }
            });
        }
    });

    rl.on('close', () => {
        console.log(getMessage('finish'))
    });
}

await startManager();