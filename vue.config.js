const path = require("path")

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        "@": path.join(__dirname, "web"),
      },
    },
    entry: {
      app: path.join(__dirname, "web", "index.ts"),
    },
    module: {
      rules: [
        {
          test: [/\.cic$/, /\.txt$/],
          use: [{ loader: "raw-loader", options: { esModule: false } }],
        },
      ],
    },
  },
}
