
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

/*io.configure('production',function(){
		
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

});*/


app.use(express.static('./public'));

console.log("listen");

var users;


var call;

//var io = socket(server);


//var users = {'0001':{con_stat:'online',socket_id:'',data:{username:'sodiq',pwd:'sodiq'}}};

//users = {};
//users['0001'] = {conn_stat: 'online', data:{usrname:'sodiq',age:24} };

var chat_msg = {"conversation":[

]};


io.on('connection',function(socket){

	//console.log(socket.id);


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


});



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
		fs.writeFile('./user.json',json,'utf8',function(err,data,new_id){

			fs.readFile('./user.json','utf8',function readFileCallback(err,data){	

			
		users_chk_aft = JSON.parse(data);

		var id_sock = users_chk_aft[id_usr].sockeid;
		
		console.log(socket.id);
		//console.log(id_sock);
		io.sockets.connected[id_sock].emit('user_list',{keys:Object.keys(users_chk_aft),val:Object.values(users_chk_aft)});	
		//io.sockets.emit('user_list',{keys:Object.keys(users_chk_aft),val:Object.values(users_chk_aft)});	

		console.log(users_chk_aft);

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

		socket.on('get_msg',function(data){

					//console.log( data.user_id + data.rec_id + data.msg);

			msg_sd = data.msg;
			var snd_rr = data.user_id;
			usr_conv = data.user_id + data.rec_id;	
					
	fs.readFile('./data.json','utf8',function readFileCallback(err,data){

		msg_read = JSON.parse(data); //now it object
		
		snd_msg_read = JSON.stringify(msg_read);

	
		//console.log(socket.id);

		io.sockets.connected[socket.id].emit('snd_get_msg',JSON.stringify(msg_read));

		
		});	



		
});

		socket.on('send-msg',function(data,callback){

			console.log(data.user_id + data.usr_name + data.msg + data.rec_id);
	
			rc_id = data.rec_id;

			usr_id = data.user_id;
		var msg_sd = data.msg;
		var usr_conv = data.user_id + data.rec_id;	


			fs.readFile('./data.json','utf8',function readFileCallback(err,data_msg){

				var obj_megs = JSON.parse(data_msg);

				conv_id = Object.keys(obj_megs.conversation).length;
				var new_idd = conv_id +1;
				//console.log(new_idd + msg_sd + usr_conv);
				obj_megs.conversation.push({"id": new_idd, "conv_usr":usr_conv, "msg":msg_sd}); 

				snd_mesg = JSON.stringify(obj_megs);
				var snd_mesgg = JSON.stringify(obj_megs);

				fs.writeFile('./data.json',snd_mesg,'utf8',function(err){
					if(err){
						console.log(err);
					}else{

				fs.readFile('./user.json','utf8',function readFileCallback(err,data_usr){

					var get_usr = JSON.parse(data_usr);

					var recv_sock = get_usr[rc_id].sockeid;


					if(!io.sockets.connected[recv_sock]){
							console.log("Not connected id");

					fs.writeFile('./data.json',snd_mesgg,'utf8',function(err){
							if(err){ console.log(err); }else{
							

	/*						fs.writeFile('user.json',json,'utf8',function(err,data,new_id){
});*/

								delever_unread(rc_id);
							}
						});
							
					}else{
						io.sockets.connected[recv_sock].emit('msg_usr',{usr_sd:usr_id,usr_rc:rc_id,msg:msg_sd});	
						console.log("Connected id" + recv_sock);
//							callback(true);
							delever_unread(rc_id);
					}
					
					//io.sockets.connected[recv_sock].emit('msg_usr',{usr_sd:usr_id,usr_rc:rc_id,msg:msg_sd});


				});	
						//console.log("saved");



					}

				});
				

				
			});
					//use thiss
					

function delever_unread(rc_id){
fs.readFile('./user.json','utf8',function readFileCallback(err,data_r){

	if(err){
		console.log(err);
	}else{
		obj_usr_ur = JSON.parse(data_r); //now it object
			obj_usr_ur[rc_id].usr_unred;
			console.log("check red" + obj_usr_ur[rc_id].usr_unred);
			var un_ef = obj_usr_ur[rc_id].usr_unred ;

			  if(un_ef==""){
			  	obj_usr_ur[rc_id].usr_unred = 1;
			  	console.log(obj_usr_ur[rc_id].usr_unred);
			  }else{
			  	obj_usr_ur[rc_id].usr_unred += 1;
			  }

		var eff_obj_r_j = JSON.stringify(obj_usr_ur);
		fs.writeFile('./user.json',eff_obj_r_j,'utf8',function(err){

			if(err){throw err;}else{ callback(true); }
		});
	}

});
}

		});

		console.log(Object.keys(io.sockets.sockets));
		//console.log(Object.values(io.sockets.sockets));

});	





