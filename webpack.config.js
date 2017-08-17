var path = require('path');
module.exports = {
    entry: './js/app.js',
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'bundle.js'
    },

    // loaders
    module: {
        rules: [{
            test: /\.js$/,
            use: {
                loader: 'babel-loader',
                query: { presets: ['react', 'es2015', 'stage-0'] }
            }
        }]
    }
};
