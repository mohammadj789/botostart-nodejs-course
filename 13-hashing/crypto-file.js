const crypto = require("crypto");
const fs = require("fs");
const filename = "index.txt";
const md5Sun = crypto.createHash("md5");
const stream = fs.ReadStream(filename);
stream.on("data", (chank) => md5Sun.update(chank));
stream.on("end", () =>
  fs.writeFile("hash.txt", md5Sun.digest("hex"), (err) => {
    if (err) console.log(err);
    else console.log("done");
  })
);
