const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

const folderPath = path.resolve(__dirname, "./src/components/");

module.exports = {
  mode: 'development',
  entry: './src/js/main.js',

  
  devServer:{
    static: path.resolve(__dirname, 'src/components'),
    port: 8080,
    hot: true
  },
  plugins:[
    [new ESLintPlugin()],
    new HtmlWebpackPlugin({
      title: 'Development',
      inject: 'body',
      hash:true,
  chunksSortMode:'manual',
  
      template: "./src/components/index.html",
      filename: "index.html",
      HTML_PATH: folderPath,

     }),
  ],
  module: {
    rules: [
      {
        test: /\.(scss)$/,
        use: [
          {
            // Adds CSS to the DOM by injecting a `<style>` tag
            loader: 'style-loader'
          },
          {
            // Interprets `@import` and `url()` like `import/require()` and will resolve them
            loader: 'css-loader'
          },
          {
            // Loader for webpack to process CSS with PostCSS
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: function () {
                  return [
                    require('autoprefixer')
                  ];
                }
              }
            }
          },
          {
            // Loads a SASS/SCSS file and compiles it to CSS
            loader: 'sass-loader'
          }
        ]
      }
    ]
  },
  output: {

    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    publicPath: '/',
  },
}