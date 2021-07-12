module.exports = {
  transpileDependencies: ["vuetify"],
  devServer: {
    host: "localhost", //frontend host
    disableHostCheck: true,
    port: 8080, //frontend port
    https: false, //no need
    proxy: {
      "/api": { target: "http://localhost:8081" }, //proxy everything from frontend localhost:8080/api to backend at localhost:8081/api
    },
    headers: {
      //Typical header setting
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Method": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Header":
        "X-Requested-With, content-type, Authorization",
    },
  },
};
