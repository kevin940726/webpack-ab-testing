const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ScriptExtHtmlWebpackPlugin = require("script-ext-html-webpack-plugin");

const getConfig = options => ({
  mode: "production",
  entry: [path.join(process.cwd(), "index.js")],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[chunkhash].chunk.js",
    chunkFilename: "[name].[chunkhash].js"
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        AB_VARIANT: JSON.stringify(options.abVariant)
      }
    }),
    new HtmlWebpackPlugin({
      filename: `index.${options.abVariant}.html`,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      },
      inject: true
    }),
    new ScriptExtHtmlWebpackPlugin({
      defaultAttribute: "defer",
      inline: "runtime"
    })
  ],
  optimization: {
    splitChunks: {
      chunks: "all"
    },
    runtimeChunk: "single"
  }
});

module.exports = [getConfig({ abVariant: "a" }), getConfig({ abVariant: "b" })];
