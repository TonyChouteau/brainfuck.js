(function() {

    /** BrainFuck object definition */
    function BrainFuck(code, options) {
        /**
         * Constructor
         * @param code {array|string} - Brainfuck code
         * @param options {Object} - Options
         */
        options = options || {};

        this.code = code;
        this.memorySize = options.memorySize || BrainFuck.MEMORY_SIZE;
        this.ascii = options.ascii || false;
        this.inputs = (options.inputs || []).reverse();

        /** Init object with type */
        this.init();
    }

    /** CONSTANTS */
    BrainFuck.MEMORY_SIZE = 100;

    BrainFuck.A_CODE = 97;

    /** Types */
    BrainFuck.ARRAY = 0;
    BrainFuck.STRING = 1;

    /** Object prototypes */
    BrainFuck.prototype = {

        /** Init function */
        init: function() {
            /** Create context */
            this.makeContext()
        },

        /** Reset Context */
        makeContext: function() {

            /** Check for code type (array or string) */
            this.raw = this.code;
            if (Array.isArray(this.code)) {
                this.type = BrainFuck.ARRAY;
                this.data = this.code.filter(char => char !== " " || char !== "\n" || char !== "\t");
            } else {
                this.type = BrainFuck.STRING;
                this.data = this.code.replaceAll(" ", "").replaceAll("\n", "").replaceAll("\t", "");
            }

            this.dataCursor = 0;
            this.loops = [];
            this.out = this.ascii ? "" : [];

            /** Init memory & cursor */
            this.cursor = 0;
            this.memory = Array.from({length: Math.max(this.memorySize, 1)}, _ => 0);

            /** Init commands */
            this.commands = {
                "<": this.left.bind(this),
                ">": this.right.bind(this),
                "+": this.add.bind(this),
                "-": this.minus.bind(this),
                ".": this.put.bind(this),
                ",": this.get.bind(this),
                "[": this.loop.bind(this),
                "]": this.goto.bind(this)
            };
        },

        /** Commands */
        left: function() {
            if (this.cursor > 0) {
                this.cursor--;
            } else {
                throw new Error("Index " + (this.cursor - 1) + "is out of memory.");
            }
        },
        right: function() {
            if (this.cursor < this.memory.length - 1) {
                this.cursor++;
            } else {
                throw new Error("Index " + (this.cursor + 1) + "is out of memory.");
            }
        },
        add: function() {
            this.memory[this.cursor]++;
        },
        minus: function() {
            this.memory[this.cursor]--;
        },
        put: function() {
            if (this.ascii) {
                this.out += String.fromCharCode(this.memory[this.cursor]);
            } else {
                this.out.push(this.memory[this.cursor]);
            }
        },
        get: function() {
            if (this.inputs.length > 0) {
                this.memory[this.cursor] = this.inputs.pop();
            } else {
                let data = null;
                while (data === null || isNaN(data)) {
                    data = +prompt();
                }
                this.memory[this.cursor] = data;
            }
        },
        loop: function() {
            if (this.memory[this.cursor] > 0) {
                this.loops.push(this.dataCursor);
            } else {
                let loopCounter = 0;
                this.dataCursor++;
                while((this.data[this.dataCursor] !== "]" || loopCounter > 0) && this.dataCursor < this.data.length) {
                    if (this.data[this.dataCursor] === "[") {
                        loopCounter++;
                    } else if (this.data[this.dataCursor] === "]") {
                        loopCounter--;
                    }
                    this.dataCursor++;
                }
            }
        },
        goto: function() {
            if (this.loops.length === 0) {
                throw new Error("Unexpected character ], no [ found before.");
            }
            if (this.memory[this.cursor] > 0) {
                this.dataCursor = this.loops[this.loops.length - 1];
            } else {
                this.loops.pop();
            }
        },

        /** Execution */
        run: function(debug) {
            while (this.dataCursor < this.data.length) {
                if (debug) this.view();
                this.commands[this.data[this.dataCursor]]();
                this.dataCursor++;
            }
            if (debug) this.view();
            return this;
        },

        view: function() {
            console.log(this.memory, this.cursor);
            return this;
        },

        print: function() {
            if (this.ascii) {
                console.log(this.out);
            } else {
                console.log(this.out.join(","));
            }
        },
    };

    window.brainfuck = (code, options) => {
        return new BrainFuck(code, options);
    };
})()