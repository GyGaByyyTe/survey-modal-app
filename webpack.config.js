const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

module.exports = (env, argv) => {
  const isDevelopment = argv.mode !== "production";

  return {
    entry: "./src/index.tsx",
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "[name].[contenthash].js",
      clean: true,
    },
    devtool: isDevelopment ? "inline-source-map" : false,
    devServer: {
      static: [
        { directory: path.join(__dirname, "dist") },
        { directory: path.join(__dirname, "public") },
      ],
      hot: true,
      port: 3000,
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: [
                "@babel/preset-env",
                "@babel/preset-react",
                "@babel/preset-typescript",
              ],
            },
          },
        },
        {
          test: /\.css$/,
          use: [
            isDevelopment ? "style-loader" : MiniCssExtractPlugin.loader,
            {
              loader: "css-loader",
              options: {
                modules: {
                  localIdentName: isDevelopment
                    ? "[name]__[local]--[hash:base64:5]"
                    : "[hash:base64]",
                },
              },
            },
          ],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: "asset/resource",
        },
      ],
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js"],
      alias: {
        src: path.resolve(__dirname, "./src"),
      },
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./public/index.html",
      }),
      isDevelopment && new ReactRefreshWebpackPlugin(),
      !isDevelopment &&
        new MiniCssExtractPlugin({
          filename: "[name].[contenthash].css",
        }),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: "public",
            to: "",
            globOptions: { ignore: ["**/index.html"] },
          },
        ],
      }),
    ].filter(Boolean),
    optimization: {
      splitChunks: {
        chunks: "all",
      },
    },
  };
};
