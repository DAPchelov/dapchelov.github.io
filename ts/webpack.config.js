const webpack = require("webpack");
const paths = require("./webpack/config/paths");
const appAliases = require("./webpack/config/aliases");
const constants = require("./webpack/config/constants");
const rules = require("./webpack/rules");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const LodashModuleReplacementPlugin = require("lodash-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
// const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

const config = {
	entry: ["react-hot-loader/patch", paths.entryPath],
	output: {
		path: paths.buildPath,
		filename: "[name].[contenthash].js",
		publicPath: "/",
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				use: [
					{
						loader: "babel-loader",
						options: {
							presets: [
								"@babel/preset-env",
								"@babel/preset-react",
							],
						},
					},
				],
				exclude: /node_modules/,
			},
			{
				test: /\.css$/,
				use: ["style-loader", "css-loader"],
			},
			{
				test: /\.(png|svg|jpg|jpeg|gif)$/i,
				type: "asset/resource",
			},
			{
				test: /\.ts(x)?$/,
				loader: "ts-loader",
				exclude: /node_modules/,
			},
		],
	},
	devServer: {
		static: {
			directory: "./build",
		},
		proxy: {
			"/v1/": "http://localhost:8080/",
		},
		historyApiFallback: true,
		port: 8082,
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: paths.appHtml,
			filename: "index.html",
			title: constants.appTitle,
			favicon: paths.appFavicon,
		}),
		new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en/),
		new LodashModuleReplacementPlugin(),
		new ForkTsCheckerWebpackPlugin({
			typescript: {
				configFile: paths.appTsConfig,
			},
		}),
		// new BundleAnalyzerPlugin(),
	],
	optimization: {
		moduleIds: "named",
		chunkIds: "named",
	},
	resolve: {
		extensions: [".tsx", ".ts", ".js"],
		alias: appAliases,
		fallback: { assert: false, util: false },
	},
};
module.exports = (env, argv) => {
	if (argv.hot) {
		config.output.filename = "[name].[hash].js";
	}
	return config;
};
