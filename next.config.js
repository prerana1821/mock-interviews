module.exports = {
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
          },
        ],
      },
    ];
  },
  env: {
    mongodbUrl:
      "mongodb://mock-interviews:mock-interviews@interview-clustor-shard-00-00.8woww.mongodb.net:27017,interview-clustor-shard-00-01.8woww.mongodb.net:27017,interview-clustor-shard-00-02.8woww.mongodb.net:27017/database?ssl=true&replicaSet=atlas-ixai5r-shard-0&authSource=admin&retryWrites=true&w=majority",
    localMongodbUrl:
      "mongodb+srv://precodes:precodes@precodes-cluster.zq4sy.mongodb.net/mocky?retryWrites=true&w=majority",
    jwtSecret:
      "QoRJIFoLTLU5Bdga0Ke8wXJoSXHMQru5ZqhVoSG7to0gdHUDqIgRXGW6jKONm88ZpkkHscy8mEL6ko6wcGjgQEZI9+svVgB9U8i3bTYVoGHuPgOhl1rlzd25mj4uuoZBFFfgMSI+k7kGe1dyvqT2BBjTbFgVGQk0YZ4Rx2njuwGUhpVKie/S4B1D2U1Bk7m/Y+MOQppfNmNODBa8yjBydTN8BLKiRIpaOvHfGOPNOiVBClT5ibjHCfZqqpl8eadVPy7fW6t2k+3hJME/FJKgviN3Uogzj7NQtE6MQ39AATg1cS671RxfCtfaT+Kk0b0lPNQInz91948MJG8sesLkrQ==",
    API_URL:
      process.env.NODE_ENV !== "production"
        ? "http://localhost:3000/"
        : "https://mock-interviews.vercel.app/",
  },
};
