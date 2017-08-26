	socket.on('mark_msg',function(data,callback){

		var	usr_t_rd = data.rec_id;

		fs.readFile('./indicte.json','utf8',function readFileCallback(err,data_r_msg){

				if(err){
		console.log(err);
	}else{
			
			red_un_js = JSON.parse(data_r_msg);			

			if(usr_t_rd in red_un_js){
			//console.log("yess");

			red_un_js[usr_t_rd].usr_unred = "";

			json_s_mrk = JSON.stringify(red_un_js);

		fs.writeFile('./user.json',json_s_mrk,'utf8',function(){

			callback(true);		
		});		

			}// chk usr

		}//read msg
	});	
});



/*fs.readFile('./user.json','utf8',function readFileCallback(err,data_r){

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

});*/
