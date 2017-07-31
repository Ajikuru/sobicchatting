$(function(){

var socket = io();


var rec_id  = $('#rec_id');
var user_name  = $('#sender');
var msg  = $('#message');
var snd_id = $('#snd_id');
var out_put = $('#output');
var sat = $('#usr_stat');

var reg_usr_name,reg_usr_id,reg_usr_pwd;
var usr_name,usr_id;
	
	reg_usr_name = $('#reg_usr_name');
	reg_usr_id = $('#reg_usr_id');
	reg_usr_pwd = $('#reg_usr_pwd');

	usr_pwd = $('#usr_pwd');
	usr_id = $('#usr_id');

var signed; 	




$(document).on('click','#list_all > li',function(){

	recid =  $(this).text();

	var sub = recid.substr(0,4);
	
	rec_id.val(sub);
	
	socket.emit('get_msg',{
		user_id: snd_id.val(),
		rec_id: rec_id.val(),
		//usr_name: user_name.val(),
		msg: msg.val()
	});

var spn_chk = $(this).find('span').text();

alert(spn_chk);


});

var conv_sh = $('#show_conv');

socket.on('snd_get_msg',function(data){

	//var data_n =  JSON.stringify(data);
	//alert(data);

	var res = $.parseJSON(data);

	//alert(res.conversation);
	//alert(data[0]['id']);	
	//alert(data.conversation[0].id);	
vis = "" +rec_id.val() + snd_id.val()+"";
ver = "" + snd_id.val() + rec_id.val()+"";

	var chk = $.grep(res.conversation,function(element,index){

				//element.conv_usr;
				return element.conv_usr == ver || element.conv_usr == vis;


		});

	$('#show_conv').html('');

	$.each(chk,function(i){

			//alert(chk[i].msg + chk[i].conv_usr);

			conv_sh.append("<li>" +chk[i].msg +  chk[i].conv_usr +"</li>");


	
		});



});




$(document).on('click','#Register',function(){

	$('.log_wrap').hide();
	$('.reg_wrap').show();

});


$(document).on('click','#Reg',function(){

	$('.log_wrap').hide();

	socket.emit('reg_user',{reg_usr_name:reg_usr_name.val(),reg_usr_id:reg_usr_id.val(),reg_usr_pwd:reg_usr_pwd.val()

	},function(data){

		if(data){
			//alert("good");
			
			alert("User Id Already Exist");
		}else{
			alert("User Created Sucessfully");
			$('.log_wrap').show();
			$('.reg_wrap').hide();
		}
		
	});	

});



$(document).on('click','#login',function(){

signed =  usr_id.val();
	socket.emit('user_login',{usr_id:usr_id.val(),usr_pwd:usr_pwd.val()


	},function(data){

		if(data){
			//alert("good");
			//$('.log_wrap').hide();	
			$('.wrap_chat').show();	
			alert("Login Sucessfully");
			//var snd_id.val(usr_id)
			var enter_val = usr_id.val();
			sat.val("Online");
			signed =  snd_id.val(enter_val);

		}else{
			alert("User does not Exist / Incorrect Password");
		}
		
	});	


});


//var userid,sender,msg;sen;
var list
var vis,ver;




socket.on('user_list',function(data){

		
	var cov_js = JSON.stringify(data.keys);
	//var vlu = JSON.stringify(val);
	//var vluu = $.parseJSON(vlu);
		//out_put.html(cov_js[0]);
	//alert(cov_js[0][0].conn_stat);
	//alert(data.val[1].details['name']);

		$('#list_all').html('');



	for(i=0; i<data.keys.length;i++){
		
		if(signed!=data.keys[i]){
		//alert(data.val[i].details.length);	
		
		var hint = "hint"+data.keys[i];

		var app = $('#list_all').append("<li>"+ data.keys[i] + data.val[i].name + "<span id=" + hint + ">" + "</span>" +"</li>");
		//alert(data.val[i].details['name']); 
		
		}
	}
			//alert(app);

	/*$.each(vlu,function(index,item){
		alert(vlu[0][index]);
	});*/

		//$.each(res.records,function(i,val){

});




$(document).on('click','#send',function(){
	
	//receiver.val(userid);
//	alert("Hello");

	socket.emit('send-msg',{
		user_id: snd_id.val(),
		rec_id: rec_id.val(),
		usr_name: user_name.val(),
		msg: msg.val()
	},function(data){

		if(data){

		$('#show_conv').append("<li>" + msg.val() + "</li>");
		//alert("Yess");
		}
	});


});


vis = rec_id.val() + snd_id.val();
ver = snd_id.val() + rec_id.val();
//ver = user_id.val() + rec_id.val();

//alert(ver);

socket.on('msg_usr',function(data){

var cv_msg = data.msg;
var  cv_usr_snd = data.usr_sd;
var  cv_usr_rc = data.usr_rc;

//var out_put = $('#output');
//var rec_id  = $('#rec_id');
//alert(cv_msg);

//$('#show_conv').append("<li>" + cv_msg + "</li>");

//	alert(cv_usr_snd);

if(cv_usr_snd == rec_id.val()){
	//alert(sat.val());
	$('#show_conv').append("<li>" + cv_msg + "</li>");
}else if(sat.val()=="Online" && rec_id.val()!=cv_usr_snd){

//alert(cv_usr_snd);
//$('#hint'+cv_usr_snd).text();
var hi = $('#hint'+cv_usr_snd).text();

if(hi==""){

var new_un = 1 ;

$('#hint'+cv_usr_snd).text(new_un);
}else{

var new_un = parseInt(hi) + 1;

$('#hint'+cv_usr_snd).text(new_un);

}



}
//out_put.html()

});




socket.on('chat_onv',function(data){

	alert(data);
});




	//socket.on('snd_conv',function(data){

		//alert(data[0].msg);
		
		/*for (i = 0; i<data.length;i++){

			//var list = $.each(data[i]);


			//alert(i.id);	
			alert(data[i].id);	
			//alert(val.id.['msg']);	
	//);




		}	*/

/*
		var chk = $.grep(data,function(element,index){

				return element.conv_usr== '00010002';


		});


		$.each(chk,function(i){

			alert(chk[i].msg);
		});
		*/

	//});

	//$('#output').html("Hello");

});



