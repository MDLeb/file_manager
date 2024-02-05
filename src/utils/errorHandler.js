export const errorHandler = (error) => {
    return error.message.replace(/(E\w*: )/ , '');
}