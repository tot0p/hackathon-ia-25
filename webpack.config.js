const createExpoWebpackConfigAsync = require('@expo/webpack-config');
const path = require('path');

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);
  
  const isProduction = process.env.NODE_ENV === 'production' || env.mode === 'production';

  if (isProduction) {
    config.output.publicPath = "./";
  }

  // Add polyfills for node core modules
  config.resolve.fallback = {
    ...config.resolve.fallback,
    "crypto": require.resolve("crypto-browserify"),
    "stream": require.resolve("stream-browserify"),
    "buffer": require.resolve("buffer/"),
    "util": require.resolve("util/"),
    "vm": require.resolve("vm-browserify")  // Add vm polyfill
  };

  // Add file loader rule for audio files
  config.module.rules.push({
    test: /\.(mp3|wav|ogg)$/,
    type: 'asset/resource',
    generator: {
      filename: 'static/media/[name].[hash:8][ext]'
    }
  });

  // Add plugins for the polyfills
  const webpack = require('webpack');
  config.plugins.push(
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer'],
    })
  );

  return config;
};