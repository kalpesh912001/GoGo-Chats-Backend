interface issues {
    validation: string,
    code: string,
    message: string,
    path: Array<string>
}

const zodErrorHandler = (issues: Array<issues>) => {
    let responseStr = '';
    issues.forEach((item, i) => {
        responseStr +=
            `${item.message}` + (issues.length == 1 || i == issues.length - 1 ? '.' : ',');
    });
    return responseStr;
}

export default zodErrorHandler;