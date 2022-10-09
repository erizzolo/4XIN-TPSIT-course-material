// games specific javascript

/**
 * Fill nav element specific for games
 * @param  {} page the name of the page (e.g. 'index')
 */
function fillNavbarForPage(page) {
    const NAVLINKS =
        [
            // page name, link description, link title, paHelpful peoplege', false, ''],
            ['logica.html', 'Logica', 'Logic games', false, ''],
            ['animazione.html', 'Animazione', 'Animation games', false, ''],
            ['scacchi.html', 'Scacchi', 'Scacchi (no cheaters please!)', false, ''],
            ['tris.html', 'Tris', 'Tris', false, ''],
            ['total15.html', 'Total 15', 'Total 15', false, ''],
            ['minesweeper.html', 'Mine sweeper', 'Alias campo fiorito', false, ''],
            ['magic.html', 'Magic squares', 'Magic squares', false, '']
        ]
    let result = ''
    for (let l = 0; l < NAVLINKS.length; l++) {
        result += createHTMLAnchor(NAVLINKS[l], page)
    }
    return result
}
