const express = require("express");

const {
  ErrorHandler,
  NotFoundError,
} = require("./util/errorHandler");
const cookieParser = require("cookie-parser");
const app = express();
app.use(cookieParser("myhashforcookieisunbelivable"));

app.get("/set-cookie", (req, res) => {
  res.cookie("cookieName", "cookieValue", {
    maxAge: 50000000,
    httpOnly: true,
    signed: true,
    secure: true,
    sameSite: "strict",
  });
  res.send("saved");
});

app.get("/get-cookie", (req, res) => {
  const cookie = req.cookies;
  const signedCookie = req.signedCookies;

  res.send({ cookie, signedCookie });
});
app.get("/clear-cookie", (req, res) => {
  res.clearCookie("cookieName");

  res.send("removed");
});

app.use(ErrorHandler);
app.use(NotFoundError);
app.listen(3000, () =>
  console.log("server is running on port 3000: http://localhost:3000")
);
