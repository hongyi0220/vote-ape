// const HTMLWebpackPlugin = require('html-webpack-plugin');
// const HTMLWebpackPluginConfig = new HTMLWebpackPlugin({
//     template: __dirname + '/app/index.html',
//     filename: 'index.html',
//     inject: 'body'
// });
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractSass = new ExtractTextPlugin({
    filename: 'app.css'
});
module.exports = {
    entry: [__dirname + '/app/main.js', __dirname + '/app/styles/app.scss'],
    output: {
        filename: 'bundle.js',
        path: __dirname + '/build'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.scss$/,
                use: extractSass.extract({
                    use: [{
                            loader: "css-loader"
                        } , {
                            loader: "sass-loader"
                        }
                    ],
                    fallback: "style-loader"
                })
            }
        ]
    },
    devServer: {
        contentBase: "./build",
        port: 3000
    },

    plugins: [extractSass]
};
