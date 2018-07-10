const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

const NODE_ENV = process.env.NODE_ENV;
const src = path.resolve(__dirname, 'src');
const dist = path.resolve(__dirname, 'dist');
const publicPath = "/";

const config = {
	entry: ["babel-polyfill", path.join(src, 'index.js')],
  	output: {
	    filename: 'index.js',
	    path: dist
	},
	module: {
        rules: [
            {
                test: /(\.js)|(\.jsx)$/,
                include: src,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg|ijmap)(\?v=\d+\.\d+\.\d+)?$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'fonts/'
                    }
                }]
            }
        ]
    },
    resolve: {
        extensions: [".webpack.js", ".web.js", ".js", ".json", ".jsx"]
    },
    plugins: [
	    // new webpack.ProvidePlugin({
	    //         //ReactDOM: 'react-dom',
	    //         //React: 'react',
	    //         //_: 'lodash'
	    //     }),
        new HtmlWebpackPlugin({
            template: path.join(src, "template/index.html")
        })
    ]
};

if (NODE_ENV === 'production') {
    config.plugins.push(
        new UglifyJsPlugin({
            parallel: true,
            sourceMap: false,
            uglifyOptions: {
                ecma: 7,
                output: {
                    comments: false,
                    beautify: false,
                },
                warnings: false
            }
        }),
        new CompressionPlugin({ //Сжатие gzip'ом
            asset: '[path].gz[query]',
            algorithm: 'gzip',
            test: /\.js$|\.css$|\.html$/,
            threshold: 10240,
            minRatio: 0.8
        })
    );
} else if (NODE_ENV === 'development') {
	config.devtool = 'inline-source-map';
    config.plugins.push(
        new webpack.HotModuleReplacementPlugin()
    );

    config.devServer = {
        host: '0.0.0.0',
        port: 8000,
        publicPath: publicPath,
        hot: true,
        inline: true,
        //headers: {'Access-Control-Allow-Origin': '*'},
        stats: {colors: true},
        historyApiFallback: true,
    };
} else {
    console.log('ERROR - check NODE_ENV');
}

module.exports = config;