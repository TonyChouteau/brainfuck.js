function handleDownload() {
    const $buttons = $(".download-button");
    const url = {
        source: "../src/brainfuck.js",
        min: "../build/brainfuck.min.js",
        archive: "../build/brainfuck.rar"
    };

    $buttons.on("click", (e) => {
        window.location.href = url[$(e.target).data("download")];
    });
}