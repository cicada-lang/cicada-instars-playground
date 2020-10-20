module.exports = {
  configureWebpack: {
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
