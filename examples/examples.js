
//Hello World
brainfuck("++++++++[>++++[>++>+++>+++>+<<<<-]>+>+>->>+[<]<-]>>.>---.+++++++..+++.>>.<-.<.+++.------.--------.>>+.>++.", {memorySize: 10, ascii: true}).run().view().print()

//Multiplication :
brainfuck(",>,<[->[->+>+<<]>[-<+>]<<]>>>.", {memorySize: 10, ascii: false, inputs: [5, 7]}).run().view().print()