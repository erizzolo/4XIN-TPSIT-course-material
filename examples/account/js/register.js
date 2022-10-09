// register specific javascript
window.addEventListener('DOMContentLoaded', registerSetup)

function registerSetup() {
    let b = document.querySelector('main button')   // the only button so far
    b.addEventListener('click', check)
}

function check() {
    let b = document.querySelector('#msg')  // error message
    let u = getTextValue('username', '')
    let msg = ''
    if (!isValidUserName(u)) {
        msg = 'Username is invalid'
    } else {
        if (isRegisteredUser(u)) {
            msg = 'Username already exists'
        } else {
            let p = getTextValue('password', null)
            if (p != getTextValue('confirm', null)) {
                msg = 'Passwords do not match'
            } else {
                // other tests ...
                let user = { name: u, real: getTextValue('realname', ''), hash: hash(p) }
                setCookie(u, JSON.stringify(user))
                setCookie('_logged', u)
                window.location.assign(getCookieValue('_dest', '../index.html'))
            }
        }
    }
    b.innerHTML = msg
}