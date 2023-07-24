const path = require('path');

module.exports = {
    mode: 'development', // or 'production'
    entry: {
        getSwings: './src/handlers/getSwings.ts',
        createSwing: './src/handlers/createSwing.ts',
        healthcheck: './src/handlers/healthcheck.ts',
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name].js',
        libraryTarget: 'commonjs',
    },
    target: 'node',
    resolve: {
        extensions: ['.ts', '.js'],
        alias: {
            '@functions': path.resolve(__dirname, 'src/handlers'),
            '@utils': path.resolve(__dirname, 'src/utils'),
        },
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
        constants: 'constants',
    },
};
