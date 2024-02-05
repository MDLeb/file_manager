export const getErrorMessage = (error) => {
    return error.message.replace(/(E\w*: )/ , '');
}