const fs = require("fs");
const http = require("http");
// const readStreamData = fs.createReadStream("./read.txt");
// const writeStreamData = fs.createWriteStream("./writePipe.txt");
http
  .createServer((req, res) => {
    const readStreamData = fs.createReadStream("./read.txt");
    res.writeHead(200, { "Content-Type": "text/plain" });
    readStreamData.pipe(res);
  })
  .listen(3000, () =>
    console.log(
      "server is running on port 3000:http://localhost:3000"
    )
  );
