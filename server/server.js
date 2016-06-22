'use strict';

const Hapi = require('hapi');
var fs = require('fs');
var exec = require('child_process').exec;
const server = new Hapi.Server();
server.connection({ port: process.env.PORT || 3010 });


var child = exec('blastp',
  function (error, stdout, stderr) {
    console.log('stdout: ' + stdout);
    console.log('stderr: ' + stderr);
    if (error !== null) {
      console.log('exec error: ' + error);
    }
});


server.route({
    method: 'GET',
    path: '/{page}',
    handler: function (request, reply) {
        reply.file(request.params.page + '.html');
    }
});

server.route({
    method: 'GET',
    path: '/static/{filename}',
     handler: function (request, reply) {
        reply.file('static/' + request.params.filename);
    }
});

server.route({
    method: 'GET',
    path: '/resources/{filename}',
     handler: function (request, reply) {
        reply.file('resources/' + request.params.filename);
    }
});

server.route({
    method: 'GET',
    path: '/folder/{foldername}',
     handler: function (request, reply) {
		 
		 var array = [];
		 var item = {};
		 fs.readdir('resources/BIOGRID', function (err, files) {
		  if (err) {
			console.log(err);
			return;
		  }
		  console.log(files);
		  for(var file = 0; file < files.length; file++){
			  if(files[file].indexOf(request.params.foldername) > -1){
				  item['id'] = files[file];
				  item['text'] = files[file];
				  array.push(item);
			  }
			  item = {};
			}
			reply(array);
		});
		
    }
});

server.route({
    method: 'GET',
    path: '/{folder}/{filename}',
     handler: function (request, reply) {
        reply.file('resources/' + request.params.folder + '/' + request.params.filename);
    }
});

server.route({
    method: 'POST',
    path: '/uploads',
    config: {

        payload: {
            output: 'stream',
            parse: true,
            allow: 'multipart/form-data'
        },

        handler: function (request, reply) {

             console.log(request);
            var data = request.payload;
            if (data.file) {
                var name = data.file.hapi.filename;
                var path = __dirname + "/uploads/" + name;
                var file = fs.createWriteStream(path);

                console.log(path);

                file.on('error', function (err) { 
                    console.error(err) 
                });

                data.file.pipe(file);

                data.file.on('end', function (err) { 
                    var ret = {
                        filename: data.file.hapi.filename,
                        headers: data.file.hapi.headers
                    }
                    console.log(JSON.stringify(ret));
                    reply(JSON.stringify(ret));
                })
            }

        }
    }
});

server.route({
    method: 'POST',
    path: '/createFasta/{name}',
    handler: function (request, reply) {
        console.log("create fasta");
        fs.writeFile(request.params.name, "", function (err) {
        if(err){
                   console.log("An error ocurred creating the file "+ err.message);
                   }
        });
    }
});

server.start((err) => {

    if (err) {
        throw err;
    }
    console.log('Server running at:', server.info.uri);
});


server.register(require('inert'), (err) => {

    if (err) {
        throw err;
    }

    server.route({
        method: 'GET',
        path: '/hello',
        handler: function (request, reply) {
            reply.file('./public/hello.html');
        }
    });
});
