const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const config = {
    entry: {
        initMap: "./src/scripts/common/initMap",
        slider: "./src/scripts/common/slider",
    },
    output: {
        filename: 'bundle.js'
    },
    plugins: [
        new UglifyJSPlugin({
            sourceMap: true
        })
    ]
};

module.exports = config;