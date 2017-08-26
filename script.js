$(document).ready(function(){

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


$(document).on('click','#login',function(){


$('.log_wrap').hide();	
$('#output').show();	
/*
signed =  usr_id.val();
	socket.emit('user_login',{usr_id:usr_id.val(),usr_pwd:usr_pwd.val()

	},function(data){

		if(data){
			//alert("good");
			$('.log_wrap').hide();	
			//$('.wrap_chat').show();	
//			alert("Login Sucessfully");
			//var snd_id.val(usr_id)
			var enter_val = usr_id.val();
			sat.val("Online");
			signed =  snd_id.val(enter_val);

		}else{
			alert("User does not Exist / Incorrect Password");
		}
		
	});	
*/

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
			
			//alert("User Id Already Exist");
		}else{
			//alert("User Created Sucessfully");
			$('.log_wrap').show();
			$('.reg_wrap').hide();
		}
		
	});	

});


	/*$('.chat_head').click(function(){
		$('.chat_body').slideToggle('slow');
	});*/
	$('.msg_head').click(function(){
		$('.msg_wrap').slideToggle('slow');
	});
	
	$('.close').click(function(){
		$('.msg_box').hide();
	});
	
	$('.user').click(function(){

		$('.msg_wrap').show();
		$('.msg_box').show();
	});
	
	$('textarea').keypress(
    function(e){
        if (e.keyCode == 13) {
            e.preventDefault();
            var msg = $(this).val();
			$(this).val('');
			if(msg!='')
			$('<div class="msg_b">'+msg+'</div>').insertBefore('.msg_push');
			$('.msg_body').scrollTop($('.msg_body')[0].scrollHeight);
        }
    });
	
});