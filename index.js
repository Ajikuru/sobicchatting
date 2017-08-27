
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


var user_dept = {"DP01":"DP01","DP02":"DP02"}


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
	console.log(socket.id + "connected Id");

socket.on('disconnect', function () {
   
   var soc_dis = socket.id;

   console.log("disconnect" + socket.id);



fs.readFile('./user_log.json','utf8',function readFileCallback(err,data_dis){
			
				var wr_lg = JSON.parse(data_dis); 

				if (soc_dis in wr_lg){
					var usr_dis  = wr_lg[socket.id];	

					socket.broadcast.emit('disconn_usr',usr_dis);



					fs.readFile('./user.json','utf8',function readFileCallback(err,data_bf_out){	


						if(err){
							console.log(err);
							}else{

								users_chk_out = JSON.parse(data_bf_out); //now it objec

							if(usr_dis in users_chk){

								users_chk_out[usr_dis].conn_stat = 'Offline';

								var wr_log_ut = JSON.stringify(users_chk_out);

						fs.writeFile('./user.json',wr_log_ut,'utf8',function(err,data){
						
								console.log("sucessfully");
							});

						}

				}

					});


					//users_chk[id_usr].conn_stat = 'Online';

				}	

		});


  });



socket.on('user_login',function(data,callback){

	id_usr = data.usr_id;
	pwd_usr = data.usr_pwd;	

	usr_dept = data.usr_dep;
	

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

		var loger_nam = users_chk[id_usr].name;

		console.log(loger_nam);

		users_chk[id_usr].conn_stat = 'Online';
		users_chk[id_usr].sockeid = socket.id;
		json = JSON.stringify(users_chk);

		var usr_jon = socket.join(usr_dept);

		//console.log(usr_jon);

		
		//console.log(new_id);
		fs.writeFile('./user.json',json,'utf8',function(err,data){


			fs.readFile('./user.json','utf8',function readFileCallback(err,data){	


			fs.readFile('./user_log.json','utf8',function readFileCallback(err,data_lg){
			
				var wr_lg = JSON.parse(data_lg); 


				wr_lg[socket.id] = id_usr;

				var wr_to_lg = JSON.stringify(wr_lg);

		fs.writeFile('./user_log.json',wr_to_lg,'utf8',function(err,data_tk){
				
				//console.log(users_chk[id_usr].sockeid + "yess");

		});			

			});	
				var users_unred ="";

				fs.readFile('./indicate.json','utf8',function readFileCallback(err,data_tk){	

				//io.sockets.emit('user_list',{keys:Object.keys(users_chk_aft),val:Object.values(users_chk_aft)});	
				
				users_unred = JSON.parse(data_tk);		
				//console.log(users_unred);			


				users_chk_aft = JSON.parse(data);

		var id_sock = users_chk_aft[id_usr].sockeid;
		
		//console.log(users_chk_aft);
		//console.log(users_unred);
	//io.sockets.connected[id_sock].emit('user_list',{keys:Object.keys(users_chk_aft),val:Object.values(users_chk_aft),usr_unr_val:users_unred});	
	io.sockets.connected[id_sock].emit('user_list',{keys:Object.keys(users_chk_aft),val:Object.values(users_chk_aft),usr_unr_key:Object.keys(users_unred),usr_unr_val:Object.values(users_unred),log_nam:loger_nam});	

		//io.sockets.emit('user_list',{keys:Object.keys(users_chk_aft),val:Object.values(users_chk_aft)});	
				});

		socket.broadcast.emit('new_user_con',id_usr);		
				//console.log(users_unred);
			
		//users_chk_aft = JSON.parse(data);

		//var id_sock = users_chk_aft[id_usr].sockeid;
		
		//console.log(users_chk_aft);
		//console.log(socket.id);
	//	console.log(users_chk_aft);
	//io.sockets.connected[id_sock].emit('user_list',{keys:Object.keys(users_chk_aft),val:Object.values(users_chk_aft),usr_unr_key:Object.keys(users_unred)});	
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


//start mar messege
	socket.on('mark_msg_rd',function(data,callback){

		var	usr_t_rd = data.user_id;
		var	usr_dt_snd = data.rec_id;

		var conb = usr_dt_snd +usr_t_rd;
		//console.log(usr_t_rd+usr_dt_snd);
		//console.log(conb + "indicat");
		

		fs.readFile('./indicate.json','utf8',function readFileCallback(err,data_r_msg_unr){

				if(err){
		console.log(err);
	}else{
			
			var red_unr_js = JSON.parse(data_r_msg_unr);			


			if(conb in red_unr_js){

			var usr = red_unr_js[conb];

			//var nw_ind = "";

			red_unr_js[conb] = 0;

				
			
			}// chk usr
		
			var json_s_mrk_ur = JSON.stringify(red_unr_js);

		fs.writeFile('./indicate.json',json_s_mrk_ur,'utf8',function(){

			callback(true);		
		});		


		}//read msg
	});	
});

//end mark messege


	
//start mar messege
	socket.on('mark_msg',function(data,callback){

		var	usr_t_rd = data.usr_rec;
		var	usr_dt_snd = data.snd_id;

		var conb = usr_dt_snd+usr_t_rd;

		//console.log(usr_t_rd+usr_dt_snd);
		

		fs.readFile('./indicate.json','utf8',function readFileCallback(err,data_r_msg){

				if(err){
		console.log(err);
	}else{
			
			red_un_js = JSON.parse(data_r_msg);			


			if(conb in red_un_js){

			var usr = red_un_js[conb];

			var nw_ind = usr + 1;

			red_un_js[conb] = nw_ind;

				
			
			}// chk usr
		else{


			red_un_js[conb] = 1;	

		}
			json_s_mrk = JSON.stringify(red_un_js);

		fs.writeFile('./indicate.json',json_s_mrk,'utf8',function(){

			callback(true);		
		});		


		}//read msg
	});	
});

//end mark messege


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
		
	

});
	
	
	
				socket.on('get_msg',function(data){

				//console.log("received get"); 	//console.log( data.user_id + data.rec_id + data.msg);

			msg_sd = data.msg;
			var snd_rr = data.user_id;
			usr_conv = data.user_id + data.rec_id;	
					
	fs.readFile('./data.json','utf8',function readFileCallback(err,data){

	if(err){throw err;}else{
	
		msg_read = JSON.parse(data); //now it object
		
		snd_msg_read = JSON.stringify(msg_read);

	
		//console.log(socket.id);

		io.sockets.connected[socket.id].emit('snd_get_msg',JSON.stringify(msg_read));
	}		
	

		
			});//readdata	



		
	});//getmessage	
	
	
	socket.on('send-msg',function(data,callback){

			console.log(data.user_id + data.msg + data.rec_id);
	
			rc_id = data.rec_id;

			usr_id = data.user_id;
		var msg_sd = data.msg;
		var usr_conv = data.user_id + data.rec_id;	

		var usr_snd_nam = data.snd_nam;

		var rom_msg_conv = usr_snd_nam+': '+msg_sd;
		console.log(usr_snd_nam + "emi ni" + rc_id);


			fs.readFile('./data.json','utf8',function readFileCallback(err,data_msg){

				var obj_megs = JSON.parse(data_msg);

				conv_id = Object.keys(obj_megs.conversation).length;
				var new_idd = conv_id +1;
				//console.log(new_idd + msg_sd + usr_conv);

				if(rc_id in user_dept){
				obj_megs.conversation.push({"id": new_idd, "conv_usr":usr_conv, "msg":rom_msg_conv}); 	
				}else{
				obj_megs.conversation.push({"id": new_idd, "conv_usr":usr_conv, "msg":msg_sd}); 	
				}
				



				snd_mesg = JSON.stringify(obj_megs);
				var snd_mesgg = JSON.stringify(obj_megs);

				fs.writeFile('./data.json',snd_mesg,'utf8',function(err){
					if(err){
						console.log(err);
					}else{

				fs.readFile('./user.json','utf8',function readFileCallback(err,data_usr){

					var get_usr = JSON.parse(data_usr);

					//console.log(rc_id);
					var recv_sock = get_usr[rc_id].sockeid;

				if(rc_id in user_dept){
					
//					io.sockets.in(rc_id).emit('msg_usr',{usr_sd:usr_id,usr_rc:rc_id,msg:rom_msg_conv});
					socket.broadcast.to(rc_id).emit('msg_usr',{usr_sd:usr_id,usr_rc:rc_id,msg:rom_msg_conv});

					//io.sockets.connected[recv_sock].emit('msg_usr',{usr_sd:usr_id,usr_rc:rc_id,msg:msg_sd});	
					//console.log("room Chat" + usr_id + rc_id);


				}else{

						if(!io.sockets.connected[recv_sock]){
							console.log("Not connected id");

					fs.writeFile('./data.json',snd_mesgg,'utf8',function(err){
							if(err){ console.log(err); }else{
							

								delever_unread(usr_id,rc_id);
							}
						});
							
					}else{

						io.sockets.connected[recv_sock].emit('msg_usr',{usr_sd:usr_id,usr_rc:rc_id,msg:msg_sd});	
						//console.log("Connected id" + recv_sock);

					}
					

				}	


				});	
						//console.log("saved");



					}

				});
				

				
			});
					//use thiss
					

function delever_unread(usr_id,rc_id){

		conb = usr_id+rc_id;

	fs.readFile('./indicate.json','utf8',function readFileCallback(err,data_r_msg){

				if(err){
		console.log(err);
	}else{
			
			red_un_js = JSON.parse(data_r_msg);			


			if(conb in red_un_js){

			var usr = red_un_js[conb];

			var nw_ind = usr + 1;

			red_un_js[conb] = nw_ind;

				
			
			}// chk usr
		else{


			red_un_js[conb] = 1;	

		}
			json_s_mrk = JSON.stringify(red_un_js);

		fs.writeFile('./indicate.json',json_s_mrk,'utf8',function(){

			callback(true);		
		});		


		}//read msg
	
});  //CLOSE FUNCTION 

			};// CLOSE SEND MESAGE	
	
	
	
	
	//console.log(users); 
		//console.log("Yess");
		//console.log(Object.keys(io.sockets.sockets));
		//console.log(Object.values(io.sockets.sockets));

}); //Close send message	





});




