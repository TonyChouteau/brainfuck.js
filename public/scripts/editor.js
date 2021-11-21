function handleEditor() {
    const $controls = $(".control");
    const $viewer = $("div", ".viewer");
    const $input = $(".input");
    const $output = $(".output");

    $controls.filter(".run").on("click", () => {
        const input = $input.val();
        const options = {
            ascii: true
        };
        const bf = brainfuck(input, options).run();
        $viewer.html(bf.memory.map((elt, i) => `<span class="${bf.cursor !== i ? "" : "cursor"}">${elt}</span>`).join(" "));
        $output.html(options.ascii ? bf.out : bf.out.join(" "));
    });
}