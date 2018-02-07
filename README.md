# Travel Services Management System
Smart monitoring of your automobile


### Requirements
- [NodeJS v8.9.4](https://nodejs.org/en/)
- [Yarn](https://yarnpkg.com/en/docs/install#mac-tab)
- [Phonegap-cli](http://docs.phonegap.com/getting-started/1-install-phonegap/cli/) 
- [Gulp](https://gulpjs.com/)
- [Webpack](https://webpack.js.org/) 

### Installation
1. Install **git** or [git-scm](https://git-scm.com/download) for windows 
2. Install **yarn**
3. `git clone https://github.com/WineReachOwner/winereach2.0-App.git`
4. `git checkout develop` This is the current development branch
5. `npm install -g phonegap@latest`
6. `npm install -g gulp-cli`
7. `npm install -g webpack`
8. `npm install -g webpack-dev-server`
9. `yarn install` Make sure that you are running this inside **winereach2.0-App** directory
10. Run development server. Please see server options below   

### Webpack Server (Web)
1. `npm run start:web` starting our http server for the development
2. Open a new terminal and change directory to **winereach2.0-App**  then run `gulp`
3. Open chrome and navigate to `http://localhost:8080/www/`  

### Phonegap Server (Mobile)   
> phonegap serve

### Electron (Windows)
N/A


### No Server
This will only create the compiled files required but will not run any server. The directory 
must reside in your own host. ex. apache , nginx etc.   
> npm run dist


> Note : **www/** directory contains compiled and minified assets from **src/** .
This will be automatically generated when you run `npm run start:web` or `npm run dist`. Please also note that
when creating a `.zip` file for **phonegap** application, you **must only** include the **www/**
folder and **config.xml**    


### Development Environment
`Set NODE_ENV=production` - output minified css and html   
`Set NODE_ENV=development` - unminified assets

> By default NODE_ENV is not set and will produce unminified assets. To change this behavior , set NODE_ENV to production



