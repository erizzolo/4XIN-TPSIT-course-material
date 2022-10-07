// core javascript

// much better than the onload attribute on body...
window.addEventListener('DOMContentLoaded', fill)

/**
 * Fills standard site elements ...
 */
function fill() {
    // get document location and split in pieces separated by '/'
    let s = window.location.href.split('/')
    // last element, i.e. page name
    let page = s[s.length - 1]
    // get rid of '.html' at the end (all pages are .html here!)
    page = page.substring(0, page.length - '.html'.length)
    // fill site standard element for this page
    fillCommon(page)
}

/**
 * Fill site common elements
 * @param  {} page the name of the page (e.g. 'index')
 */
function fillCommon(page) {
    insertHeader(page)
    fillNavbar(page)
    fillNews(page)
    fillFooter(page)
    // disable context menu
    document.querySelector('body').addEventListener('contextmenu', noMenu)
}

function noMenu(event) {
    event.preventDefault()
}

/**
 * Inserts an header element as first child of body
 * @param  {} page the name of the page (e.g. 'index')
 */
function insertHeader(page) {
    // create the element
    const header = document.createElement('header')
    // set attributes
    header.id = 'site-header'
    // fill HTML content
    let parent = page == 'index' ? '' : '../'
    let h = `<img src="${parent}images/Logo_Levi-Ponti.PNG"`
    h += ` alt="Logo dell'Istituto Levi-Ponti">`
    h += '<p>Welcome to our site: enjoy!</p>'
    header.innerHTML = h
    // get body element: the one and only body
    const body = document.querySelector('body')
    // append or insert at beginning
    if (body.firstChild == null) {
        body.appendChild(header)
    } else {
        body.insertBefore(header, body.firstChild)
    }
}

/**
 * Fill nav element
 * @param  {} page the name of the page (e.g. 'index')
 */
function fillNavbar(page) {
    // page name, link description, link title, page in root directory?, link classes
    const NAVLINKS =
        [
            ['games.html', 'Games', 'Official games page', false, ''],
            ['jokes.html', 'Jokes', 'Wanna have fun?', false, 'missing']
        ]
    const INFOLINKS =
        [
            ['about.html', 'About', 'Site information', false, 'info'],
            ['credits.html', 'Credits', 'Helpful people', false, 'info']
        ]
    const e = document.getElementById("site-nav")
    if (e != null) {
        // link to home page
        let h = createHTMLAnchor(['index.html', 'Home', 'The home page', true, ''], page)
        // link to other pages
        for (let l = 0; l < NAVLINKS.length; l++) {
            h += createHTMLAnchor(NAVLINKS[l], page)
        }
        // page specific sections
        if (typeof fillNavbarForPage === "function") {
            h += fillNavbarForPage(page)
        } else {
            // console.log("no page specific function")
        }
        // link to info pages
        for (let l = 0; l < INFOLINKS.length; l++) {
            h += createHTMLAnchor(INFOLINKS[l], page)
        }
        e.innerHTML = h
    } else {
        console.log("no site-nav element for page " + page)
    }
}

/**
 * Create HTML code for an a element
 * @param {*} linkInfo infor about destination (see NAVLINKS)
 * @param {*} fromPage the page containing the link
 */
function createHTMLAnchor(linkInfo, fromPage) {
    const root = fromPage == 'index' ? '' : '../'   // path to root directory
    const subdir = fromPage == 'index' ? 'html/' : ''   // path to subdirectory
    const pathToPageDirectory = linkInfo[3] ? root : subdir // path to destination directory
    const active = (fromPage + '.html') == linkInfo[0] ? ' active' : '' // class for active link
    let h = ''
    h += '<a'  // opening tag
    h += ` class="${linkInfo[4]} ${active}"`    // class attribute
    h += ` href="${pathToPageDirectory + linkInfo[0]}"` // href attribute
    h += ` title="${linkInfo[2]}"`  // title attribute
    h += '>'    // end opening tag
    h += `${linkInfo[1]}`   // link description
    h += '</a>' // closing tag
    return h
}

/**
 * Fill news element with HTTP request (ignore it ...)
 * @param  {} page the name of the page (e.g. 'index')
 */
function fillNews(page) {
    const e = document.getElementById("site-news")
    // Doesn't work on local files (CORS must be http)
    // fallback on using iframe
    if (e != null) {
        let base = `${page == 'index' ? 'html/' : ''}news`
        fetch(base + '.txt')
            .then(response => { if (response.ok) return response; throw Error('?') })
            .then(response => response.text())
            .then(text => e.innerHTML = text)
            .catch(error => e.innerHTML = `<iframe src="${base + '.html'}"></iframe>`)
    } else {
        console.log("no site-news element for page " + page)
    }
}

/**
 * Fill footer element
 * @param  {} page the name of the page (e.g. 'index')
 */
function fillFooter(page) {
    const NAVLINKS =
        [
            ['games.html', 'Games', 'Official games page', false, ''],
            ['jokes.html', 'Jokes', 'Wanna have fun?', false, 'missing'],
            ['about.html', 'About', 'Site information', false, 'info'],
            ['credits.html', 'Credits', 'Helpful people', false, 'info'],
            ['privacy.html', 'Privacy', 'No privacy at all!!!', false, 'info']
        ]
    const e = document.getElementById("site-footer")
    if (e != null) {
        let h = `Powered by 4XIN`
        // link to home page
        h += createHTMLAnchor(['index.html', 'Home', 'The home page', true, ''], page)
        // link to other pages
        for (let l = 0; l < NAVLINKS.length; l++) {
            h += createHTMLAnchor(NAVLINKS[l], page)
        }
        h += `<a class="mail" href="mailto:a@edu.iislevipont.it">Email us</a>`
        e.innerHTML = h
    } else {
        console.log("no site-footer element for page " + page)
    }
}

// useful functions -----------------------------------------------------------
/**
 * Return the value of the cookie with the given name or default value
 * @param {*} name name of the cookie
 * @param {*} defaultValue value to return if cookie not found (defaults to null)
 * @returns the value of the cookie with the given name or default value
 */
function getCookieValue(name, defaultValue = null) {
    let cookies = document.cookie.split('; ')
    for (let c = 0; c < cookies.length; ++c) {
        if (cookies[c].startsWith(name + '=')) {
            return cookies[c].substring(name.length + 1)
        }
    }
    return defaultValue
}

/**
 * Returns an array of the given length filled with the given value
 * @param {*} length the length of the returned array
 * @param {*} value the value to fill the array wtih, defaults to 0
 * @returns an array of the given length filled with the given value
 */
function constArray(length, value = 0) {
    const result = []
    result.length = length
    return result.fill(value)
}

/**
 * Returns an array of the given length filled with values starting at start
 * and incremented by delta
 * @param {*} length the length of the returned array
 * @param {*} start the value at index 0, defaults to 0
 * @param {*} delta the incremenet between successive values, defaults to 1
 * @returns an array of the given length filled with successive values starting at start
 */
function iota(length, start = 0, delta = 1) {
    const result = []
    for (let index = 0; index < length; ++index, start += delta) {
        result[index] = start
    }
    return result
}

/**
 * Return the selected value of the input(s) with the given name or default value
 * @param {*} name name of the input(s)
 * @param {*} value default value if none selected (defaults to null)
 * @returns the selected value of the input(s) with the given name or default value
 */
function getRadioValue(name, value = null) {
    const e = document.querySelector('input[name="' + name + '"]:checked')
    return e == null ? value : e.value
}

/**
 * Return whether the input with the given id is checked or not
 * @param {*} id id of the input(s)
 * @returns true if the input with the given id is checked, false otherwise
 */
function isChecked(id) {
    const e = document.getElementById(id)
    return e == null ? false : e.checked
}

/**
 * Just a console.log that can be disabled everywhere
 * @param {*} what 
 */
function debug(what) {
    console.log(what)
}

/**
 * Restituisce se valido il valore dell'input type="number" con la data id
 * oppure il valore di default fornito
 * @param {*} id l'id dell'elemento di input
 * @param {*} value valore da restituire se l'elemento non esiste o non è valido
 * @returns il valore dell'input oppure value
 */
function getNumber(id, value = null) {
    let e = document.querySelector('#' + id + ':valid')
    return e == null ? value : e.valueAsNumber
}
