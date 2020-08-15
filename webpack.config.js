module.exports = {
  entry: ["@babel/polyfill", "./client/src/index.js"],
  module: {
    loaders: [
      {
        test: /\.jsx$/,
        loader: "babel-loader",
        exclude: /node_modules/,
      },
    ],
  },
};
