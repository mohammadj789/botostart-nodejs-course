const http = require("http");

http
  .createServer((req, res) => {
    res.writeHead(201, { "Content-Type": "text/plain" });
    res.end("WHY");
  })
  .listen(3000, () => {
    console.log("server is running on port 3000");
  });
