'use strict';

const Hapi = require('hapi');
var fs = require('fs');
var exec = require('child_process').exec;
const server = new Hapi.Server();
server.connection({ port: process.env.PORT || 3010 });

/*
var child = exec('blastp',
  function (error, stdout, stderr) {
    console.log('stdout: ' + stdout);
    console.log('stderr: ' + stderr);
    if (error !== null) {
      console.log('exec error: ' + error);
    }
});
*/

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
    path: '/compare',
    handler: function (request, reply) {
        var child = exec('makeblastdb -in ' + __dirname + '/resources/temp/codestemp.txt -dbtype prot -parse_seqids -out ' +
		__dirname + '/resources/temp/fastatempdb',
		function (error, stdout, stderr) {
		console.log('stdout: ' + stdout);
		console.log('stderr: ' + stderr);
		if (error !== null) {
		  console.log('exec error: ' + error);
		}
		else{
			var grandchild = exec('blastp -query ' + __dirname 
			+ '/resources/temp/modified_fasta_temp.txt -db ' + __dirname 
			+ '/resources/temp/fastatempdb -evalue 0.05 -num_descriptions 500 -outfmt 6 -out ' + 
			__dirname + '/resources/temp/blastoutput',
			function (error, stdout, stderr) {
			console.log('stdout: ' + stdout);
			console.log('stderr: ' + stderr);
				if (error !== null) {
				console.log('exec error: ' + error);
				}
			}
		)}
		})}
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

           console.log(request.payload);
           var data = request.payload;
           if (data.file) {
            var path = __dirname + "/resources/" + request.payload.type + "/" + request.payload.species.replace(' ', '_').replace('\r\n', '') + "_"+request.payload.type+".txt";
            var file = fs.createWriteStream(path);

            console.log(path);

            file.on('error', function (err) { 
                console.error(err) 
            });

            data.file.pipe(file);

            data.file.on('end', function (err) { 
                var ret = {
                    filename: request.payload.species.replace(' ', '_').replace('\r\n', '') + "_"+request.payload.type+".txt",
                    headers: data.file.hapi.headers
                }
                reply.redirect('upload');
            })
        }

    }
}
});

server.route({
    method: 'POST',
    path: '/createFasta/{name}',
    handler: function (request, reply) {
        fs.writeFile('resources/temp/'+request.params.name, request.payload.data, function (err) {
            if(err){
             console.log("An error ocurred creating the file "+ err.message);
         }
         else
            reply(JSON.stringify("ok"));
    });
    }
});

server.route({
    method: 'POST',
    path: '/changeFasta/{name}',
    handler: function (request, reply) {

var output = "";
        fs.readFile('resources/fasta/' + request.params.name, (err, data) => {
          if (err) throw err;
          var lines = data.toString().split('\n');
          var num = 1;
          for(var line = 0; line < lines.length; line++){
            var temp = lines[line];
            if(temp.indexOf("#") > -1 || temp == ""){

            }
            else if(temp.indexOf(">") > -1){
                output += ">seq" + num + "\n";
                num++;
            }
            else{
                output += temp;
            }
        }

        fs.writeFile('resources/temp/codestemp.txt',output, function (err) {
            if(err){
             console.log("An error ocurred creating the file "+ err.message);
         }
         else
            reply(JSON.stringify("ok"));
    });

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
