const path = require('path')
const glob = require('glob')
const cleanWebpackPlugin = require('clean-webpack-plugin')


const config = {
	entry: toObject(glob.sync(`./src/js/**/*.js*`),'./src'),  
	output: {
		path: path.resolve(__dirname,'www'),
		filename: '[name].js'
	},
	plugins: [
		new cleanWebpackPlugin(['www'])
	],
	module: {
		rules: [{
			test: /\.js$/,
			include: /src/,
			exclude: /node_modules/,
			use: {
				loader: "babel-loader",
				options: {
					presets: ['env']
				}
				
			}


		}]
	}
}

function toObject(paths,exclude) {
	
  var ret = {};

  paths.forEach(function(path) {
	var a = path.split('/')
	var dir = a.slice(0,a.length-1).join('/')+'/'
	var name = a[a.length-1].split('.')
    ret[dir.replace(exclude,'.') + name.slice(0,name.length-1).join('.')] = path;
  });

  return ret;

}

module.exports = config