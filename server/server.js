'use strict';

const Hapi = require('hapi');
var fs = require('fs');

const server = new Hapi.Server();
server.connection({ port: process.env.PORT || 3010 });

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
        reply.file('resources/' + request.params.filename);
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
    path: '/upload',
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
