const jwt = require("jsonwebtoken");
const secret = "3d9eb3ee0ec03ac784c9cc0e9a5d01bc";
const token = jwt.sign(
  { name: "mohammadjavadsoltanian", id: 22 },
  secret,
  { expiresIn: "1s", algorithm: "HS512" }
);
console.log(jwt.verify(token, secret));
console.log(jwt.decode(token));
setTimeout(() => {
  console.log(jwt.decode(token));
  console.log(jwt.verify(token, secret));
}, 5000);
