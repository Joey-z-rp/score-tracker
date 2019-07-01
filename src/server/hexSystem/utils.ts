export const is404 = ($: CheerioStatic): boolean => {
    const title = $('h1', 'header').text().toLocaleLowerCase();

    return title.includes('not found') || title.includes('404');
}