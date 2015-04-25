var development = {
  firebase: {
    rootRefUrl: "https://cognitio-dev.firebaseio.com/",
    serverUID: "cognitio",
    secretKey: "x7tkv4j3DklFxdmNUkbtkZfpMSTiwJWGBczyaDid"
  }
};

var test = {
  firebase: {
    rootRefUrl: "",
    serverUID: "cognitio",
    secretKey: ""
  }
};

var production = {
  firebase: {
    rootRefUrl: process.env.FB_URL,
    serverUID: process.env.FB_SERVER_UID, 
    secretKey: process.env.FB_SECRET_KEY
  }
};

var config = {
  development: development,
  test: test,
  production: production,
};
module.exports = config;

