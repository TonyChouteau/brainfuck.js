function handleAnimation() {
    const FIRST_DELAY = 500;
    const STRING_DELAY = 2000;
    const CHAR_DELAY = 100;

    const $title = $(".home-title");
    const t = {
        0: "BrainFuck.js",
        1: ",>,<[->>+<<]>[->+<]>.",
        cursor: 0,
        stringCursor: 0,
        way: 0
    }
    let currentTitle = "";
    let interval;

    function startAnimation(delay) {
        setTimeout(() => {
            interval = setInterval(() => {
                if (t.way === 0) {
                    currentTitle += t[t.cursor][t.stringCursor]
                    t.stringCursor++;
                } else {
                    currentTitle = currentTitle.substr(0, currentTitle.length - 1);
                    t.stringCursor--;
                }
                if (t.stringCursor === 0 || t.stringCursor === t[t.cursor].length) {
                    t.way = (t.way + 1) % 2;
                }
                if (t.stringCursor === t[t.cursor].length) {
                    clearInterval(interval);
                    startAnimation(STRING_DELAY);
                }
                if (t.stringCursor === 0) {
                    t.cursor = (t.cursor + 1) % 2;
                }
                $title.html(currentTitle);
            }, CHAR_DELAY);
        }, delay)
    }

    startAnimation(FIRST_DELAY);
}