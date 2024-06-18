const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js", // Your entry point file
  output: {
    path: path.resolve(__dirname, "dist"), // Output directory
    filename: "bundle.js", // Output bundle file
    publicPath: "/", // Ensure all paths are served from the root
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ["file-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html", // Path to your HTML template
      filename: "index.html",
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, "public"), // Update this to match your public directory
    },
    compress: true,
    port: 9000,
    open: true, // This option will open the browser
    proxy: [
      {
        context: ["/api"],
        target: "http://localhost:3000", // Forward API requests to the API server
        secure: false,
        changeOrigin: true,
      },
    ],
    historyApiFallback: {
      index: "/index.html",
    }, // This option ensures that all routes are served to the React app
  },
  // Change to 'production' for production builds
  mode: process.env.NODE_ENV,
};
