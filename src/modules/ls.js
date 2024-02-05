import fs from "node:fs";
import state from "../state.js";

export const ls = async () => {

    return new Promise((res, rej) => {
        fs.readdir(state.SELECTED_DIR, {withFileTypes: true}, (err, files) => {
            let resFiles = files.map(i => {
                return {'Name': i.name, 'Type': i.isFile() ? 'file' : 'directory'}
            }).sort(sortFn);
            if (err) rej(err);
            res(resFiles);
        })
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
