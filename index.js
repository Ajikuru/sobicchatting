
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
	
//start tag register
	socket.on('reg_user',function(data,callback){

	var reg_id = data.reg_usr_id;
	var reg_name = data.reg_usr_name;
	var reg_pwd = data.reg_usr_pwd;



	fs.readFile('./user.json','utf8',function readFileCallback(err,data_rv){

	if(err){
		console.log(err);
	}else{
			
			reg_js = JSON.parse(data_rv);			

		if(reg_id in reg_js){
			//console.log("yess");
			callback(true);
		}else{

	
		//reg_js[reg_id] = {conn_stat: 'offline', sockeid:'',details:{name:reg_name,pwd:reg_pwd}};
		reg_js[reg_id] = {conn_stat: 'offline', sockeid:'',name:reg_name,pwd:reg_pwd,usr_unred:''};
		json = JSON.stringify(reg_js);
		fs.writeFile('./user.json',json,'utf8',function(){

			callback(false);		
		});
			
			//console.log("no");
		}	


	}

});	
//stop tag register
		

				socket.on('get_msg',function(data){

					//console.log( data.user_id + data.rec_id + data.msg);

			msg_sd = data.msg;
			var snd_rr = data.user_id;
			usr_conv = data.user_id + data.rec_id;	
					
	fs.readFile('./data.json','utf8',function readFileCallback(err,data){

		msg_read = JSON.parse(data); //now it object
		
		snd_msg_read = JSON.stringify(msg_read);

	
		console.log(snd_msg_read);

		io.sockets.connected[socket.id].emit('snd_get_msg',JSON.stringify(msg_read));

		
			});//readdata	



		
	});//getmessage
	
		

});
	
	
	//console.log(users); 
		//console.log("Yess");
		//console.log(Object.keys(io.sockets.sockets));
		//console.log(Object.values(io.sockets.sockets));

});	





