
# Installation Guide

### Environment Setup
1. [Red Hat® Enterprise Linux® / RHEL](https://www.redhat.com/en/technologies/linux-platforms/enterprise-linux) or [CentOS](https://www.centos.org/) is recommended for your server's operating system.

1. Install node.js. The latest Node.js LTS version (10.15.3 at the time of writing) is recommended. Suggested to install via first installing [notion](https://www.notionjs.com/), then run ```notion install node 10```

1. Install the babel-cli: ```npm i -g babel-cli```

1. [Install RethinkDB](https://rethinkdb.com/docs/install/centos/)

1. Start a RethinkDB instance. To start a rethinkdb instance, run the command:

```
rethinkdb
```



It will creates its working files in the current directory.

1. Verify you can access the RethinkDB admin console at http://localhost:8080

## Project Setup

1. In the cloned *agilegps* folder, run ```npm install``` to install the dependencies from package.json.

1. Run ```npm run webpack```. This builds the front end based on the package.json scripts section which is using webpack.

1. Place your Google Maps key in *agilegps/public/app/index.html* on the appropriate script tag.

1. (Optional) replace the Google Analytics code with your Google Analytics in *agilegps/public/app/index.html*

## Schema Setup

1. ```cd agilegps/src/tools```

1. Run ```babel-node schema.js``` to create the DB, tables, and indexes. It’s safe to run this multiple times because it does not drop any DB objects. Verify that the tables exist in the RethinkDB admin console. It should only take a few seconds to run.

1. Run ```babel-node createAnAdmin.js admin password``` to create an Admin user with password "password".

## Building the Front End
1. ```npm run watch``` from the root of the project will run webpack in watch mode, continually rebuilding the front end as changes are made.
1. ```npm run webpack``` from the root of the project runs webpack once, to rebuild the front end a single time.


## Building the Back End
1. ```npm run build``` from the root of the project will run babel. The built version is used by processes.json for production usage since it uses less memory than *node-babel*.

## Running the Application

1. ```cd agilegps/src/server```
1. ```node runner``` starts the web server, listening for file system code changes and automatically restarting the web server process on change, for easier development.
1. ```babel-node server``` starts the server without listening for file system changes.
1. ```babel-node debug server``` runs the server in the debugger.
2. Node 6.3.0 and later has V8 Inspector integration which allows attaching Chrome DevTools to Node.js instances for debugging and profiling: https://nodejs.org/api/debugger.html#debugger_v8_inspector_integration_for_node_js 
1. You should be able to access and login to the app at http://localhost:3000
1. After running ```npm run build```, you can run ```cd agilegps/build/server``` and then run ```node server``` to run the built version (e.g., without `babel-node`)

## Running the Message Listener

The message listener (also known as the message gateway or just gateway) receives messages from tracker devices and inserts into the database. The message listener can be started and stopped independently of the web server.

1. ```cd agilegps/src/listener```
1. Run: ```babel-node listen.js```
1. To debug, ```babel-node debug listen.js```

## Deploying to Production

The *processes.json* file is pre-configured for [PM2](http://pm2.keymetrics.io/) which is a convenient way to run the app in production. PM2 can be installed to automatically run the app at system startup, log process output, etc.

1. (Optional) Put your Google Maps API key in ```config/geocoding.js``` if using Google Reverse Geocoding

1. Configure *agilegps/config/listener.js*

1. Configure *agilegps/config/web.json*
   1. isReverseProxied - if you are behind a reverse proxy, set this to true
   1. cluster - true to use all CPUs
   1. jwtSecret - you should generate a random long string here. This string is used to sign the JWT tokens.
   1. cookieKeys - you should generate an array of two strings. These are used to sign the session cookies. The array allows you to rotate in new keys.

1. ```pm2 start processes.json```  

## Tools

1. [location generator](https://github.com/llambda/agilegps/blob/master/src/tools/locgenerator.js) - generate random GPS data for an IMEI
1. [faker](https://github.com/llambda/agilegps/blob/master/src/tools/faker.js) - Load event data from a file and send as if it came from GPS units.
1. [Create an Admin](https://github.com/llambda/agilegps/blob/master/src/tools/createAnAdmin.js)
1. [base64 encoder and decoder](https://decodotron.com/)
