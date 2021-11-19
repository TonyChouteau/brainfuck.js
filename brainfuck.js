(function() {

    /** BrainFuck object definition */
    function BrainFuck(input, memorySize, ascii) {
        /**
         * Constructor
         * @param {array|string} - Brainfuck code
         * @param {number} - Memory size
         */

        this.input = input;
        this.memorySize = memorySize || BrainFuck.MEMORY_SIZE;
        this.ascii = ascii || false;

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

            /** Check for input type (array or string) */
            this.raw = this.input;
            if (Array.isArray(this.input)) {
                this.type = BrainFuck.ARRAY;
                this.data = this.input.filter(char => char !== " " || char !== "\n" || char !== "\t");
            } else {
                this.type = BrainFuck.STRING;
                this.data = this.input.replaceAll(" ", "").replaceAll("\n", "").replaceAll("\t", "");
            }

            this.dataCursor = 0;
            this.loops = [];
            this.out = "";

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
                this.out += this.memory[this.cursor] + " ";
            }
        },
        get: function() {
            let data = null;
            while (data === null || isNaN(data)) {
                data = +prompt();
            }
            this.memory[this.cursor] = data;
        },
        loop: function() {
            this.loops.push(this.dataCursor);
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
        run: function() {
            while (this.dataCursor < this.data.length) {
                this.commands[this.data[this.dataCursor]]();
                this.dataCursor++;
            }
            return this;
        },

        print: function() {
            return this.out;
        },

        view: function() {
            return this.memory;
        }
    };

    window.brainfuck = (input, memorySize, ascii) => {
        return new BrainFuck(input, memorySize, ascii);
    };
})()