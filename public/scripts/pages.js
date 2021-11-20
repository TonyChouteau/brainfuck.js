function getMenu() {
    return `
        <div class="button flex" data-page="doc">Documentation</div>
        <div class="button flex" data-page="download">Download</div>
        <div class="button flex" data-page="editor">Online Editor</div>
        <div class="button flex" data-page="github">Github</div>
    `;
}

function handlePages() {
    const GITHUB_REPO_URL = "https://github.com/TonyChouteau/brainfuck.js";
    const ANIMATION_DURATION = 400; //ms

    const $pages = $(".page");

    $(".menu").html(getMenu());
    const $buttons = $(".button", ".menu");

    /**
     *  Handle hash changes
     */
    document.onmouseover = function() {
        //User's mouse is inside the page.
        window.innerDocClick = true;
    }

    document.onmouseleave = function() {
        //User's mouse has left the page.
        window.innerDocClick = false;
    }
    window.onhashchange = function() {
        if (!window.innerDocClick) {
            console.log(window.location.hash);
            changePage();
        }
    }

    const showPage = (hash) => {
        $pages.hide().filter("." + hash).show().animate({
            opacity: 1,
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
     *  Handle onClick
     */
    $buttons.on("click", (e) => {
        const page = $(e.target).data("page");
        if (page === "github") {
            window.location.href = GITHUB_REPO_URL;
        } else {
            window.location.href = "#" + page;
            changePage();
        }
    });
    changePage(true);
}