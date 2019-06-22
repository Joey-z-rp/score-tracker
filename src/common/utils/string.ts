export const capitalizeEachWord = (str: string): string =>
    str.toLowerCase().split(' ')
    .map(word => word[0].toUpperCase() + word.slice(1))
    .join(' ');