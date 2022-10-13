// login specific javascript
window.addEventListener('DOMContentLoaded', loginSetup)

function loginSetup() {
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
        if (isRegisteredUser(u) && matchesStoredPassword(u, getTextValue('password', null))) {
            setCookie('_logged', u)
            let destination = getCookieValue('_dest', '../index.html')
            deleteCookie('_dest')
            window.location.assign(destination)
        } else {
            msg = 'username or password invalid'
        }
    }
    b.innerHTML = msg
}