const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

// Export a function that returns the webpack configuration object
module.exports = () => {
  return {
    mode: 'development', // Set the mode to 'development'
    entry: {
      main: './src/js/index.js', // Specify the entry point for the main bundle
      install: './src/js/install.js' // Specify the entry point for the install bundle
    },
    output: {
      filename: '[name].bundle.js', // Use dynamic naming for the output bundles based on the entry points
      path: path.resolve(__dirname, 'dist'), // Set the output path to the 'dist' directory
    },
    plugins: [
      // Webpack plugin that generates our HTML file and injects our bundles
      new HtmlWebpackPlugin({
        template: './index.html', // Specify the template file for generating the HTML
        title: 'Just Another Text Editor' // Set the title of the generated HTML
      }),

      // Injects our custom service worker
      new InjectManifest({
        swSrc: './src-sw.js', // Specify the path to the service worker source file
        swDest: 'src-sw.js', // Specify the destination file for the injected service worker
      }),

      // Creates a manifest.json file
      new WebpackPwaManifest({
        fingerprints: false, // Disable fingerprinting of the manifest file
        inject: true, // Inject the manifest into the HTML
        name: 'Just Another Text Editor', // Set the name of the PWA
        short_name: 'JATE', // Set the short name of the PWA
        description: 'Progressive Web Application Text Editor', // Set the description of the PWA
        background_color: '#225ca3', // Set the background color of the PWA
        theme_color: '#225ca3', // Set the theme color of the PWA
        start_url: './', // Set the start URL of the PWA
        publicPath: './', // Set the public path of the PWA
        icons: [
          {
            src: path.resolve('src/images/logo.png'), // Specify the path to the PWA icon
            sizes: [96, 128, 192, 256, 384, 512], // Specify the sizes of the PWA icon
            destination: path.join('assets', 'icons'), // Specify the destination directory for the PWA icon
          },
        ],
      }),
    ],

    module: {
      // CSS loaders
      rules: [
        {
          test: /\.css$/i, // Match CSS files
          use: ['style-loader', 'css-loader'], // Use style-loader and css-loader to handle CSS files
        },
        {
          test: /\.m?js$/, // Match JavaScript files
          exclude: /node_modules/, // Exclude the 'node_modules' directory
          use: {
            loader: 'babel-loader', // Use babel-loader to transpile JavaScript files
            options: {
              presets: ['@babel/preset-env'], // Set the presets for babel-loader to '@babel/preset-env'
              plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'], // Set the plugins for babel-loader
            },
          },
        },
      ],
    },
  };
};


