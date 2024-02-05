import state from "../state.js";
import {isFunction} from "./isFunction.js";

const msg = {
    'start': () => `Welcome to the File Manager, ${state.USER_NAME}!`,
    'finish': () =>`Thank you for using File Manager, ${state.USER_NAME}, goodbye!`,
    'directory': () =>`You are currently in ${state.SELECTED_DIR}\n`,
    'error': (errorMes) => `Operation failed: ${errorMes}\n`,
    'cli_error': `Invalid input: command doesn't exist\n`,
    // 'cli_error': `Invalid input: command doesn't exist\n`,
    'success': `Operation done\n`
}

export const getMessage = (operation, ms) => isFunction(msg[operation]) ? msg[operation](ms) : msg[operation];


