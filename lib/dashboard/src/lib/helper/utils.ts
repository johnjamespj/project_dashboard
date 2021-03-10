export function textellipsis(str: string = "", len: number): string {
    if (str.length > len && str.charAt(len - 1) === " ") {
        len -= 1
        return textellipsis(str, len)
    }

    return str.length > len ? `${str.substr(0, len)}...` : str
}

export function joinClass(arg1: string, option: { [key: string]: boolean } = {}) {
    const classNames = [arg1]
    Object.keys(option).forEach((x) => {
        if (option[x]) classNames.push(x)
    })
    
    return classNames.join(" ")
}