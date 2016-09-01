import * as path from 'path';
import * as fs from 'fs';
import * as helpers from './helpers';

import * as CopyWebpackPlugin from 'copy-webpack-plugin';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';
import * as CompressionPlugin from 'compression-webpack-plugin';
import * as WebpackMd5Hash from 'webpack-md5-hash';
import * as AssetsPlugin from 'assets-webpack-plugin';
import * as atl from 'awesome-typescript-loader';
// import * as webpack from 'webpack';

const webpack = require('webpack');

module.exports = env => {
  const addPlugin = (add, plugin) => add ? plugin : undefined;
  const ifProd = plugin => addPlugin(env.prod, plugin);
  const removeEmpty = array => array.filter(i => !!i);

  const DLL = require(helpers.root('src/dll.browser'));
  const polyfills = DLL.polyfills(env);
  const rxjs = DLL.rxjs(env);

  // Production Plugins
  const prodPlugins = removeEmpty([
    ifProd(new WebpackMd5Hash()),
    ifProd(new webpack.optimize.DedupePlugin()),

    ifProd(new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
      quiet: true
    })),

    ifProd(new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    })),

    ifProd(new webpack.optimize.UglifyJsPlugin({
      beautify: false, // prod
      mangle: { screw_ie8: true }, // prod
      compress: { screw_ie8: true }, // prod
      comments: false // prod
    })),

    ifProd(new CompressionPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.js$|\.html$/,
      threshold: 10240,
      minRatio: 0.8
    }))
  ]);

  // Main Config
  const main = {
    target: 'web',
    debug: !env.prod,
    devtool: env.prod ? 'source-map' : 'cheap-module-source-map',
    entry: {
      main: [].concat(polyfills, helpers.root('src/main.browser.ts'), rxjs)
    },
    resolve: {
      root: helpers.root('src'),
      modulesDirectories: ['node_modules'],
      extensions: ['', '.ts', '.js'],
      // unsafeCache: true
    },
    output: {
      filename: '[name].bundle.js',
      path: helpers.root('dist'),
      chunkFilename: '[id].chunk.js',
    },
    module: {
      preLoaders: [
        {
          test: /\.ts$/,
          loader: 'string-replace-loader',
          query: {
            search: '(System|SystemJS)(.*[\\n\\r]\\s*\\.|\\.)import\\((.+)\\)',
            replace: '$1.import($3).then(mod => mod.__esModule ? mod.default : mod)',
            flags: 'g'
          },
          include: [helpers.root('src')]
        },
        {
          test: /\.js$/,
          loader: 'source-map-loader',
          exclude: [
            /node_modules/
          ]
        }
      ],
      loaders: [
        {
          test: /\.ts$/,
          loader: ['awesome-typescript', 'angular2-template'],
          exclude: [
            /\.(spec|e2e)\.ts$/,
            /node_modules/
          ]
        },
        {
          test: /\.html$/,
          loader: 'raw-loader',
          exclude: [helpers.root('src/index.html')]
        },
        { test: /\.json$/, loader: 'json-loader' },
        { test: /\.css$/, loader: 'to-string-loader!css-loader!postcss-loader' },
        {
          test: /\.(jpe?g|png|gif|ico|svg)$/,
          loader: 'url-loader',
          query: { limit: 10000, name: '/assets/images/[name].[hash].[ext]' }
        },
        {
          test: /\.(eof|woff|woff2|ttf|eot)$/,
          loader: 'url-loader',
          query: { limit: 10000, name: '/assets/fonts/[name].[hash].[ext]' }
        }
      ]
    },
    plugins: [
      ...prodPlugins,
      new AssetsPlugin({
        path: helpers.root('dist'),
        filename: 'webpack-assets.json',
        prettyPrint: true
      }),
      new webpack.DllReferencePlugin({
        context: helpers.ROOT,
        manifest: helpers.getManifest('vendors'),
      }),
      new webpack.DllReferencePlugin({
        context: helpers.ROOT,
        manifest: helpers.getManifest('polyfills'),
      }),
      new CopyWebpackPlugin([
        {
          from: 'src/index.html',
          to: '.'
        },
        {
          from: 'src/assets',
          to: 'assets'
        }
      ]),
      new atl.ForkCheckerPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.ProgressPlugin({})
    ],
    postcss: [
      require('postcss-partial-import'),
      require('postcss-nested'),
      require('postcss-conditionals'),
      require('postcss-mixins'),
      require('lost')(),
      require('postcss-cssnext')({
        browsers: ['last 2 versions']
      }),
      require('postcss-color-function')
    ],
    devServer: {
      compress: true,
      contentBase: helpers.root('dist'),
      port: 8080,
      hot: env.hot,
      inline: env.hot,
      historyApiFallback: true,
      stats: 'minimal'
    },
    node: {
      global: 'window',
      process: true,
      Buffer: false,
      crypto: 'empty',
      module: false,
      clearImmediate: false,
      setImmediate: false,
      clearTimeout: true,
      setTimeout: true
    }
  };

  return [main];
};
