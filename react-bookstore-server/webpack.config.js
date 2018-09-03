module.exports = {
  entry: "./components/app.jsx",
  module: {
    rules: [
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        query: {
          presets: ["env", "react"]
        },
        loader: "babel-loader"
      }
    ]
  },
  output: {
    filename: "bundle.js",
    path: __dirname + "/public/"
  }
}
