export const bem = (block: string) => (elem?: string, mods?: {[modname: string]: string}): string => {
    let className = block + (elem ? '__' + elem : '');
    let beforeModsClassName = className;

    if (mods) {
        for (let modname in mods) {
            className += ' ' + beforeModsClassName + '_' + modname + (mods[modname] ? '_' + mods[modname] : '');
        }
    }

    return className;
}