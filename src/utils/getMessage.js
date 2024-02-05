import state from "../state.js";

export const getMessage = (operation) => {
    switch (operation) {
        case 'start':
            return `Welcome to the File Manager, ${state.USER_NAME}!`;
            break;
        case 'finish':
            return `Thank you for using File Manager, ${state.USER_NAME}, goodbye!`;
            break;
        case 'directory':
            return `You are currently in ${state.SELECTED_DIR}\n`;
            break;
    }
}