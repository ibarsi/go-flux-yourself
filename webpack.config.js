/* ---------------------------------------------
    WEBPACK
---------------------------------------------- */

'use strict';

// IMPORTS
const path = require('path');

// PATHS
const node_modules = path.resolve(__dirname, 'node_modules');

const config = {
    entry: `${ path.resolve(__dirname) }/demo/demo.js`,
    devtool: 'inline-source-map',
    output: {
        filename: 'demo.bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: [
                    node_modules
                ],
                use: [
                    'babel-loader'
                ]
            }
        ]
    },
    resolve: {
        extensions: [ '.js', '.jsx' ],
        modules: [
            'node_modules'
        ],
        descriptionFiles: [
            'package.json'
        ]
    },
    cache: true
};

module.exports = config;
