const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const server = {
    node: {
        __dirname: false,
    },
    target: 'node',
    entry: {
        server: './src/server/server.ts',
    },
    output: {
        path: path.resolve(__dirname, '../build'),
        filename: 'server.js',
        libraryTarget: 'commonjs',
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    'babel-loader',
                    {
                        loader: 'ts-loader',
                        options: {
                            transpileOnly: true,
                        },
                    },
                ],
                include: [
                    path.resolve(__dirname, '../src'),
                ],
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
    },
    plugins: [new CleanWebpackPlugin('build', { root: path.resolve(__dirname , '..') })],
};

const client = {
    entry: {
        client: ['babel-polyfill', './src/client/index.tsx'],
    },
    output: {
        path: path.resolve(__dirname, '../build/public'),
        filename: 'app.js',
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    'babel-loader',
                    {
                        loader: 'ts-loader',
                        options: {
                            transpileOnly: true,
                        },
                    },
                ],
                include: [
                    path.resolve(__dirname, '../src'),
                ],
            },
            {
                test: /\.(png|jpg|gif|svg|ico)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            publicPath: '/public',
                            outputPath: '../public',
                        },
                    },
                ],
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
    },
    plugins: [
        new CopyWebpackPlugin([
            { from: 'public/', to: './' },
        ], { debug: 'warning' }),
    ],
};

module.exports = { client, server };
