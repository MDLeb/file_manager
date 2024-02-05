import state from "../state.js";
import fs from "node:fs";

export const ls = async () => {
    fs.readdir(state.SELECTED_DIR, {withFileTypes: true},  (error, files) => {
        let resFiles = files.map(i => {
            return {'Name': i.name, 'Type': i.isFile() ? 'file' : 'directory'}
        }).sort(sortFn)
        console.table(resFiles)
        if (error) {
            console.error(`${error}`)
        }
    })
}

const sortFn = (a, b) => {
    if (a.Type === 'directory' && b.Type !== 'directory') {
        return -1;
    }
    if (a.Type !== 'directory' && b.Type === 'directory') {
        return 1;
    }
    const nameA = a.Name.toLowerCase();
    const nameB = b.Name.toLowerCase();

    if (/^[a-z]/.test(nameA) && /^[а-я]/.test(nameB)) {
        return -1;
    }
    if (/^[а-я]/.test(nameA) && /^[a-z]/.test(nameB)) {
        return 1;
    }
    if (nameA < nameB) {
        return -1;
    }
    if (nameA > nameB) {
        return 1;
    }
    return 0;
}
