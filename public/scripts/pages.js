function getMenu() {
    return `
        <div class="button flex" data-page="download">Download</div>
        <div class="button flex" data-page="doc">Documentation</div>
        <div class="button flex" data-page="editor">Online Editor</div>
        <div class="button flex" data-page="github">Github</div>
    `;
}

function handlePages() {
    const GITHUB_REPO_URL = "https://github.com/TonyChouteau/brainfuck.js";
    const ANIMATION_DURATION = 400; //ms
    const BUTTON_COLOR = "black";
    const HOVER_COLOR = "#232323";

    const $menu = $(".menu");
    $menu.html(getMenu());

    const $pages = $(".page");
    $(".logo", $pages.not(".home")).on("click", () => {
        window.location.hash = "";
        changePage();
    });

    const $buttons = $(".button", ".menu");

    let currentHash = "home";
    let loading = false;

    const showPage = (hash) => {
        currentHash = hash;
        $pages.hide().filter("." + hash).show().animate({
            opacity: 1,
        }, ANIMATION_DURATION);
        $buttons.css({
            background: BUTTON_COLOR,
            pointerEvents: "auto",
        }).filter(`[data-page=${hash}]`).css({
            background: HOVER_COLOR,
            pointerEvents: "none",
        });
        setTimeout(() => {
            loading = false
        }, ANIMATION_DURATION);
    };

    const changePage = (first) => {
        const hash = window.location.hash.replace("#", "") || "home";
        if (first) {
            showPage(hash);
        } else {
            $pages.animate({
                opacity: 0,
            }, ANIMATION_DURATION);
            setTimeout(() => {
                showPage(hash);
            }, ANIMATION_DURATION);
        }
    };

    /**
     *  Handle hash changes
     */
    document.onmouseover = function() {
        window.innerDocClick = true;
    }

    document.onmouseleave = function() {
        window.innerDocClick = false;
    }
    window.onhashchange = function() {
        if (!window.innerDocClick) {
            console.log(window.location.hash);
            changePage();
        }
    }

    /**
     *  Handle onClick
     */
    $buttons.on("click", (e) => {
        if (!loading) {
            loading = true;
            const page = $(e.target).data("page");
            if (page === "github") {
                window.location.href = GITHUB_REPO_URL;
            } else {
                window.location.href = "#" + page;
                changePage();
            }
        }
    });

    /**
     *  Handle page change on arrival
     */
    changePage(true);
}