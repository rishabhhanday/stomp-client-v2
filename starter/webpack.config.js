const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/js/controller/appController.js',
    output: {
        path: path.resolve(__dirname, '../'),
        filename: 'starter/dist/js/stomp-bundle.js'
    },
    devServer: {
        contentBase: "."
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: "./src/index.html"
        })
    ]
};