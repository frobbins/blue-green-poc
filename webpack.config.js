const path = require('path');
const glob = require('glob');

module.exports = {
    mode: 'development', // or 'production'
    entry: './src/handlers/getSwings.ts',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'getSwings.js',
        libraryTarget: 'commonjs',
    },
    target: 'node',
    resolve: {
        extensions: ['.ts', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    externals: {
        path: 'path',
        fs: 'fs',
        assert: 'assert',
        os: 'os',
        constants: 'constants'
    },
};
