export const mergeScopes = (
    source?: string | string[],
    target?: string | string[]
) => {
    source ||= [];
    target ||= [];

    if (!Array.isArray(source)) {
        source = source.split(' ');
    }

    if (!Array.isArray(target)) {
        target = target.split(' ');
    }

    return source
        .concat(target)
        .filter((value, pos, c) => c.indexOf(value) === pos)
        .join(' ')
        .trim();
};
