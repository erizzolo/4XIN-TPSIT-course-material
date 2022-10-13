// login specific javascript
window.addEventListener('DOMContentLoaded', settingsSetup)

function settingsSetup() {
    if (getLoggedUser() == null) {
        setTimeout(redir, 2000)
    }
}
function redir() {
    window.location = '../index.html'
}
