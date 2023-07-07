//Basic
const data = "mohammadj789/1180098366";
const encodedData = Buffer.from(data).toString("base64");
const decodedData = Buffer.from(encodedData, "base64").toString(
  "ascii"
);
console.log(decodedData);
//
//
//Bearer
