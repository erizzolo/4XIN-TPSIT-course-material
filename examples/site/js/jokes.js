// jokes specific javascript

// another way to customize a page

window.addEventListener('DOMContentLoaded', custom)

/**
 * Custom setup specific for this page
 */
function custom() {
    // get paragraph in header and modify it
    const p = document.querySelector('header p')    // hope it's the right one
    if (p != null) {
        p.innerHTML = 'We are joking!'
    }
    // insert a joke in main element
    const m = document.querySelector('main')    // hope it's the right one
    if (m != null) {
        m.innerHTML = `<h1>What’s the best thing about Switzerland?</h1>
        <h2>I don’t know, but the flag is a big plus.</h2>` + m.innerHTML
    }

}
