export default (title, path) => {
    document.title = (() => {
        let t = 'Joseph Bergen';
        if (title) {
            t += ` | ${title}`
        }
        return t;
    })();

    if (window.ga && path) {
        window.ga('set', 'page', path);
        window.ga('send', 'pageview');
    } else {
        console.log('GA NOT ACTIVE:', path)
    }
}
