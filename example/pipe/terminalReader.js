const { createWriteStream } = require("fs");

const stream = createWriteStream("./terminalReader.txt");
process.stdin.pipe(stream);
