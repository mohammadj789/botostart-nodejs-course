module.exports = {
  MONGO_ID_PATERN: /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i,
  ROLS: {
    USER: "USER",
    ADMIN: "ADMIN",
    WRITER: "WRITER",
    TEACHER: "TEACHER",
    SUPPLIER: "SUPPLIER",
  },
  ACCESS_TOKEN_SECRET_KEY:
    "8637BE14255251B82C050C90B024E4F4750EB6ACBAB5448779FC849DAB7A3B67",
  REFRESH_TOKEN_SECRET_KEY:
    "ABF8D9F0761B4503AE80E00EC6BD6E29E4A21CBAE50F69068745929F93B3E33E",
};
