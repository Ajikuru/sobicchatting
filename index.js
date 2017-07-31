
var express = require('express');
//var JsonQuery = require('json-query');

var fs = require('fs');
var app =  express();

//var socket = require('socket.io');

//var server  = app.listen(5000);
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 3000;

server.listen(port, function () {
  console.log('Server listening at port %d', port);
});

/*io.configure(function () {  
  io.set("transports", ["xhr-polling"]); 
  io.set("polling duration", 10); 
});*/

/*io.configure(function(){
		
	io.enable('browser client minification');
	io.enable('browser client etag');
	io.set('log level',1);
	io.set('transports',[
		'websocket'
		, 'flashsocket'
		,'htmlfile'
		,'xhr-polling'
		,'jsonp-polling'
	]);
	io.set("polling duration", 10);

});*/


app.use(express.static('./public'));

console.log("listen");

var users;
var call;

//var io = socket(server);


//var users = {'0001':{con_stat:'online',socket_id:'',data:{username:'sodiq',pwd:'sodiq'}}};

//users = {};
//users['0001'] = {conn_stat: 'online', data:{usrname:'sodiq',age:24} };

io.on('connection',function(socket){



socket.on('user_login',function(data,callback){

	id_usr = data.usr_id;
	pwd_usr = data.usr_pwd;	

	fs.readFile('./user.json','utf8',function readFileCallback(err,data){

	if(err){
		console.log(err);
	}else{


		users_chk = JSON.parse(data); //now it object
		

		//obj[reg_id] = {conn_stat: 'offline', sockeid:'',data:{name:reg_name,pwd:reg_pwd}};
		

			if(id_usr in users_chk){

		
				if(users_chk[id_usr].pwd === pwd_usr){

					callback(true);
				var obj_ar = {id:"usr_id"};

		users_chk[id_usr].conn_stat = 'Online';
		users_chk[id_usr].sockeid = socket.id;
		json = JSON.stringify(users_chk);


		
		var dd = "hello";
		//console.log(new_id);
		fs.writeFile('./user.json',json,'utf8',function(err,data){

			fs.readFile('./user.json','utf8',function readFileCallback(err,data){	

			
		users_chk_aft = JSON.parse(data);

		var id_sock = users_chk_aft[id_usr].sockeid;
		
		console.log(users_chk_aft);
		//console.log(socket.id);
		//console.log(id_sock);
	io.sockets.connected[id_sock].emit('user_list',{keys:Object.keys(users_chk_aft),val:Object.values(users_chk_aft)});	
		//io.sockets.emit('user_list',{keys:Object.keys(users_chk_aft),val:Object.values(users_chk_aft)});	

		

				});

		});
	
				console.log("ok");
				}else{


			

							callback(false);
					}
							//console.log(users_chk[id_usr].pwd);
			}
		
	}

});	

});

//console.log(users); 
		//console.log("Yess");

		console.log(Object.keys(io.sockets.sockets));
		//console.log(Object.values(io.sockets.sockets));

});	





