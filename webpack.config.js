import path from 'node:path'

export default {
  mode: 'development',
  entry: {
    inicio: './src/js/inicio.js',
    itinerario: './src/js/itinerario.js',
    contacto: './src/js/contacto.js',
    toastrConfig: './src/js/toastrConfig.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve('public/js')
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  resolve: {
    extensions: ['.js']
  },
  devtool: 'source-map'
}
