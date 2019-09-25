let isWaiting = null;
let waiters = [];
let waitIntervalId = null;
async function waitD3MapScript(src) {
    return new Promise((resolve) => {
        if (window.d3) {
            resolve();
        } else {
            waiters.push(resolve);
            if (!waitIntervalId) {
                waitIntervalId = setInterval(() => {
                    d3IsLoaded();
                }, 100);
            }
            if (!isWaiting) {
                isWaiting = true;
                loadScript(src);
            }
        }
    });
}
function d3IsLoaded() {
    if (window.d3) {
        waiters.forEach((w) => w());
        clearInterval(waitIntervalId);
    }
}
function loadScript(src) {
    console.log('AAAA', 'load src')
    const s = document.createElement('script');
    s.src = src;
    document.head.appendChild(s);
}
module.exports = waitD3MapScript;
