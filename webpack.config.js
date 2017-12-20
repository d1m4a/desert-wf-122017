const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const config = {
    entry: {
        js: "./src/scripts/app.js"
    },
    output: {
        filename: 'bundle.js'
    },
    plugins: [
        /*new UglifyJSPlugin({
            sourceMap: true
        })*/
    ]
};

module.exports = config;