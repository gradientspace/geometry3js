var path = require('path');

module.exports = {
    entry: {
        'g3' : './src/g3.js'
    },
    output: {
    	filename: '[name].webpack.js',
    	path: path.resolve(__dirname, 'dist/webpack-prod'),

        libraryTarget: 'var',
        library: 'g3'        
    }
};
