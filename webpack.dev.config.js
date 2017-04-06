var path = require('path');

module.exports = {
    entry: {
        'g3' : './src/g3.js'
    },
    output: {
    	filename: '[name].webpack.js',
    	path: path.resolve(__dirname, 'dist/webpack-dev'),

        libraryTarget: 'var',
        library: 'g3'        
    },

    // generate source map file (kind of useless though)
    devtool: 'source-map' 
};
