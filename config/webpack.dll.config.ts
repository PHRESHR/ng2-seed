import * as helpers from './helpers';
import { polyfills, vendors } from '../src/dll.browser';

import * as CompressionPlugin from 'compression-webpack-plugin';
import * as WebpackMd5Hash from 'webpack-md5-hash';
import * as AssetsPlugin from 'assets-webpack-plugin';
// import * as webpack from 'webpack';

const webpack = require('webpack');

module.exports = env => {
  const addPlugin = (add, plugin) => add ? plugin : undefined;
  const ifProd = plugin => addPlugin(env.prod, plugin);
  const removeEmpty = array => array.filter(i => !!i);

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

  const dll = {
    devtool: '#source-map',
    entry: {
      polyfills: [...polyfills(env)],
      vendors: [...vendors(env)]
    },
    output: {
      path: helpers.root('dist/dll'),
      filename: '[name].js',
      sourceMapFilename: '[name].[hash].map',
      library: '__[name]'
    },
    module: {
      loaders: [
        {
          test: /\.ts$/,
          loader: 'awesome-typescript-loader',
          exclude: [helpers.root('src/app')],
          include: [helpers.root('./src')]
        },
      ],
      postLoaders: [
        {
          test: /.json$/,
          loader: 'string-replace-loader',
          query: {
            search: '}(.*[\\n\\r]\\s*)}(.*[\\n\\r]\\s*)}"activeExports": \\[\\]',
            replace: '',
            flags: 'g'
          }
        }
      ]
    },
    plugins: [
      ...prodPlugins,
      new AssetsPlugin({
        path: helpers.root('dist/dll/'),
        filename: 'webpack-assets.json',
        prettyPrint: true
      }),
      new webpack.DllPlugin({
        name: '__[name]',
        path: helpers.root('dist/dll/[name]-manifest.json'),
      }),
      new webpack.ProgressPlugin({}),
    ]
  };

  return [dll];
};
