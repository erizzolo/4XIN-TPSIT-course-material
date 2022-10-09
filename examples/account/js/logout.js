// login specific javascript
window.addEventListener('DOMContentLoaded', logoutSetup)

function logoutSetup() {
    deleteCookie('_logged')
    setTimeout(redir, 1000)
}
function redir() {
    window.location.assign(getCookieValue('_dest', '../index.html'))
}