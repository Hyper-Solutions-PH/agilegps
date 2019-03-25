'use strict';
var webpack = require('webpack');
var NODE_ENV = process.env.NODE_ENV || null;

var plugins = [];
// plugins.push(new webpack.ProvidePlugin({
// 	'Promise': 'bluebird'
// }));


if (NODE_ENV === 'production') {
	// plugins.push(new webpack.optimize.UglifyJsPlugin());
	plugins.push(new webpack.DefinePlugin({
		'process.env.NODE_ENV': '"production"'
	}))
}
// todo config.optimization.splitChunks
// plugins.push(new webpack.optimize.CommonsChunkPlugin({ name: 'vendors', filename: 'vendors.js' }));

module.exports = {
	// optimization: {
	// 	splitChunks: {
	// 	  chunks: 'async',
	// 	  minSize: 30000,
	// 	  maxSize: 0,
	// 	  minChunks: 1,
	// 	  maxAsyncRequests: 5,
	// 	  maxInitialRequests: 3,
	// 	  automaticNameDelimiter: '~',
	// 	  name: true,
	// 	  cacheGroups: {
	// 		vendors: {
	// 		  test: /[\\/]node_modules[\\/]/,
	// 		  priority: -10
	// 		},
	// 		default: {
	// 		  minChunks: 2,
	// 		  priority: -20,
	// 		  reuseExistingChunk: true
	// 		}
	// 	  }
	// 	}
	// },
	context: __dirname + '/src/client',
	node: {
		fs: "empty",
		tls: "empty",
	},
	entry: {
		app: './main.js',
		// vendors: [
		// 	'bluebird',
		// 	'bootstrap/less/bootstrap.less',
		// 	'cookies-js',
		// 	'events',
		// 	'j2c',
		// 	'lodash',
		// 	'mithril',
		// 	'moment',
		// 	'nprogress',
		// 	'pikaday2',
		// 	'raf',
		// 	'redux',
		// 	'redux-logger',
		// 	'setimmediate',
		// 	'socket.io-client',
		// 	'validator',
		// 	'velocity-animate',
		// 	'windrose',
		// ]
	},
	output: {
		path: __dirname + '/public/app',
		filename: 'bundle.js'
	},
	module: {
		// preLoaders: [
		//     {test: /\.js$/, exclude: /node_modules/, loader: 'jshint-loader'}
		// ],
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						// presets: ['@babel/preset-env'],
						// plugins: [
						// 	"@babel/plugin-transform-regenerator",
						// ],
					}
				}
			},
			{
				test: /bootstrap\/js\//,
				use: {
					loader: "imports-loader",
					options: {
						jQuery: "jquery"
					}
				}
			},
			{
				test: /\.less$/,
				use: [
					{ loader: "style-loader" },
					{ loader: "css-loader" },
					{ loader: "less-loader" }
				]
			},
			{
				test: /\.css$/,
				use: [
					{ loader: "style-loader" },
					{ loader: "css-loader" }
				]
			},
			{
				test: /\.woff(2)?(\?v=\d+\.\d+\.\d+)?$/,
				use: {
					loader: "url-loader",
					options: {
						limit: 10000,
						mimetype: "application/font-woff"
					}
				}
			},
			{
				test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
				use: {
					loader: "url-loader",
					options: {
						limit: 10000,
						mimetype: "application/octet-stream"
					}
				}
			},
			{
				test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
				use: {
					loader: "file-loader"
				}
			},
			{
				test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
				use: {
					loader: "url-loader",
					options: {
						limit: 10000,
						mimetype: "image/svg+xml"
					}
				}
			}
		]
	},
	plugins: plugins
};
