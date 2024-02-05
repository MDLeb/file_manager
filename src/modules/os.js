import * as osInf from 'node:os';
import {isFunction} from "../utils/isFunction.js";

export const os = async (arg) => {
    let fn = arg.replace('--', '');
    return systemInfo[fn]();
}

const systemInfo = {
    'EOL': () => JSON.stringify(osInf.EOL),
    'username': () => osInf['userInfo']().username,
    'homedir': () => osInf['userInfo']().homedir,
    'architecture': () => osInf.arch(),
    'cpus': () => {
        return osInf.cpus()
            .map(i => {
                return {
                    model: i.model,
                    'clock_rate\ \(GHz\)': (i.speed * 0.001).toFixed(2),
                }
            })
    },
}