import os from 'node:os'
function state() {
    const env = process.env;
    const args = process.argv;

    this.SELECTED_DIR = os.homedir();
    this.USER_NAME = Object.values(args)
        .find(i => i.startsWith('--username'))
        ?.replace('--username=', '') ?? 'Anon';

    this.setDirectory = (directory) => {
        this.SELECTED_DIR = directory;
    }

}

export default new state();

