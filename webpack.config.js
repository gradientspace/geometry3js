var path = require('path');

module.exports = {
    entry: {
        'g3' : './src/g3.js'
    },
    output: {
    	filename: '[name].js',
    	path: path.resolve(__dirname, 'dist'),

        libraryTarget: 'var',
        library: 'g3'        
    }
};
