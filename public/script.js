$(document).ready(function(){

var socket = io();

var rec_id  = $('#rec_id');
var user_name  = $('#sender');
var msg  = $('textarea');
var snd_id = $('#snd_id');
var out_put = $('#output');
var sat = $('#usr_stat');
var Dept = $('#usr_dept');

var chatter = $('#chatter');


var reg_usr_name,reg_usr_id,reg_usr_pwd;
var usr_name,usr_id;
	
	reg_usr_name = $('#reg_usr_name');
	reg_usr_id = $('#reg_usr_id');
	reg_usr_pwd = $('#reg_usr_pwd');

	usr_pwd = $('#usr_pwd');
	usr_id = $('#usr_id');

var signed; 	

/*$('textarea').keypress(
    function(e){
        
    });*/


vis = rec_id.val() + snd_id.val();
ver = snd_id.val() + rec_id.val();

//ver = user_id.val() + rec_id.val();

//alert(ver);

socket.on('msg_usr',function(data){

var cv_msg = data.msg;
var  cv_usr_snd = data.usr_sd;
var  cv_usr_rc = data.usr_rc;


//alert(cv_usr_rc + cv_usr_snd);

//var out_put = $('#output');
//var rec_id  = $('#rec_id');
//alert(cv_msg);

var per_t_rc = rec_id.val();
//$('#show_conv').append("<li>" + cv_msg + "</li>");

//	alert(cv_usr_snd);

//var user_dept = {"DP01":"DP01","DP02":"DP02"}


if(per_t_rc =="DP01" || per_t_rc =="DP02"){
	//alert("It is there");
}

/*if(cv_usr_rc == rec_id.val()){

	alert(rec_id.val());
}*/
//alert(cv_usr_rc + sat.val());

if(cv_usr_rc =="DP01" || cv_usr_rc=="DP02"){

//alert(cv_usr_snd + "joint" +rec_id.val());
if(cv_usr_rc == rec_id.val()){

	$('<div class="msg_a">'+ cv_msg +'</div>').insertBefore('.msg_push');
	$('.msg_body').scrollTop($('.msg_body')[0].scrollHeight);
}else if(sat.val()=="Online" && rec_id.val()!=cv_usr_rc){

	//alert('yess');

	var hii = $('#hint'+cv_usr_rc).attr('data-badge');

	var ind = $('#hint'+cv_usr_rc).attr('data-ind','true');

	//alert(cv_usr_rc);

var snd_of_ind = cv_usr_rc;
var rec_of_ind = usr_id.val();


	//alert('Yess not available' + cv_usr_rc + usr_id.val());


	if(hii==""){

var new_un = 1 ;

//$('#hint'+cv_usr_snd).text(new_un);

}else{

var new_un = parseInt(hii) + 1;

}
/*socket.emit('mark_msg',{snd_id: snd_of_ind,usr_rec:rec_of_ind},function(data){

		if(data){

				alert("yess");
		}
});*/

	$('#hint'+cv_usr_rc).attr("data-badge",new_un);
	//alert(cv_usr_rc + new_un);

	var usr_ntf_b = 0;

$('.badge1').each(function(i){
		
//		var usr_ntf = 0;
		var value = $(this).attr('data-badge');
		
		var leng = value.length;
	
		//alert(value);				

		if(value>0){
			usr_ntf_b += 1; 
		
		}
			
	});

/*if(usr_ntf_b==0){
$('.badge2').attr('data-badge','');*/
//}else{
$('.badge2').attr('data-badge',usr_ntf_b);	

}


}else{

if(cv_usr_snd == rec_id.val()){
	//alert(sat.val());
	//$('#show_conv').append("<li>" + cv_msg + "</li>");

	$('<div class="msg_a">'+ cv_msg +'</div>').insertBefore('.msg_push');
	$('.msg_body').scrollTop($('.msg_body')[0].scrollHeight);

}else if(sat.val()=="Online" && rec_id.val()!=cv_usr_snd){

	//alert('yess');
var hii = $('#hint'+cv_usr_snd).attr('data-badge');

var ind = $('#hint'+cv_usr_snd).attr('data-ind','true');

//alert(hii);

if(hii==""){

var new_un = 1 ;

//$('#hint'+cv_usr_snd).text(new_un);

}else{

var new_un = parseInt(hii) + 1;

}

//emit
//cv_usr_rc + cv_usr_snd
socket.emit('mark_msg',{snd_id: cv_usr_snd,usr_rec:cv_usr_rc},function(data){

		if(data){

				//alert("yess");
		}
});

//emit


	$('#hint'+cv_usr_snd).attr("data-badge",new_un);

//var nt_bg = $('#hint'+cv_usr_snd).attr('data-badge');


var usr_ntf_b = 0;

$('.badge1').each(function(i){
		
//		var usr_ntf = 0;
		var value = $(this).attr('data-badge');
		
		var leng = value.length;
	
		//alert(value);				

		if(value>0){
			usr_ntf_b += 1; 
		
		}
			
	});

/*if(usr_ntf_b==0){
$('.badge2').attr('data-badge','');*/
//}else{
$('.badge2').attr('data-badge',usr_ntf_b);	
//}


}else{
	

	socket.emit('mark_msg',{snd_id: cv_usr_snd,usr_rec:cv_usr_rc},function(data){

		if(data){

				//alert("yess");
		}
	});
	
	}	

			} // non_room
});//out_put.html()



//snd msg


$('textarea').keypress(
    function(e){

    	if($('#chat_user').html()=='Username'){
    		return false;
    	}

    	

    	//$(this).val('') return false;

        if (e.keyCode == 13) {
            e.preventDefault();
           
        
           if($(this).val()==''){
    		return false;
    	}

socket.emit('send-msg',{
		user_id: snd_id.val(),
		rec_id: rec_id.val(),
		usr_name: user_name.val(),
		msg: msg.val(),
		snd_nam: chatter.text()
	},function(data){

		if(data){

				//alert(msg);
			
            var msg = $(this).val();
			$(this).val('');
			if(msg!='')
			$('<div class="msg_b">'+ msg +'</div>').insertBefore('.msg_push');
			$('.msg_body').scrollTop($('.msg_body')[0].scrollHeight);
        	
        	$(this).val('');
		}
	

	});


		
}


    });



$(document).on('click','#output > div',function(e){



	e.preventDefault();

	recid =  $(this).text();

	

	var sub = recid.substr(0,4);


	rec_id.val(sub);
	
	socket.emit('get_msg',{
		user_id: snd_id.val(),
		rec_id: rec_id.val(),
		//usr_name: user_name.val(),
		msg: msg.val()
	});

var ind_c = $(this).find('.badge1').attr('data-ind');

var chatto = recid.substr(6,20);

$('#chat_user').text(sub +": " + chatto);


if(ind_c=="true"){
	
	//alert(rec_id.val());

if(rec_id.val()== "DP01" || rec_id.val()=="DP02"){

			$('#'+rec_id.val()).find('.badge1').attr('data-badge','');
		//	var spn_chk = $(this).find('.badge1').attr('data-badge','');
			$('#'+rec_id.val()).find('.badge1').attr('data-ind','false');
	//alert("yS"+'false');
}else{
	socket.emit('mark_msg_rd',{user_id:usr_id.val(),rec_id: rec_id.val()},function(data){

		if(data){
			//alert("Yess clear");
			$('#'+rec_id.val()).find('.badge1').attr('data-badge','');
		//	var spn_chk = $(this).find('.badge1').attr('data-badge','');
			$('#'+rec_id.val()).find('.badge1').attr('data-ind','false');
		}
	});

}




	var rd_bag_cl = $('.badge2').attr('data-badge');

	if(rd_bag_cl>0){
		
		nw_rd_bag_cl = rd_bag_cl - 1;

		$('.badge2').attr('data-badge',nw_rd_bag_cl);		
	}

	var aft_rd_bag = $('.badge2').attr('data-badge');

	if(aft_rd_bag==0){
		$('.badge2').attr('data-badge','');		
	}
}




	


});

var conv_sh = $('#show_conv');

socket.on('snd_get_msg',function(data){

	//var data_n =  JSON.stringify(data);
	//alert(data);

	var res = $.parseJSON(data);

	//alert(res.conversation);
	//alert(data[0]['id']);	
	//alert(data.conversation[0].id);	
vis = ""+rec_id.val() + snd_id.val()+"";
ver = ""+ snd_id.val() + rec_id.val()+"";

	//alert(rec_id.val());

	if(rec_id.val() == "DP01" || rec_id=="DP02"){

			var chk = $.grep(res.conversation,function(element,index){

				//element.conv_usr;
				//return element.conv_usr == ver || element.conv_usr == vis;
				return element.conv_usr.substring(4,8) == "DP01" || element.conv_usr.substring(4,8) == "DP02";


		});

	}else{

		var chk = $.grep(res.conversation,function(element,index){

				//element.conv_usr;
				return element.conv_usr == ver || element.conv_usr == vis;


		});
	}


	




	$('#show_conv').html('');
	
	$('.msg_a').remove();
	$('.msg_b').remove();
	$.each(chk,function(i){


		//alert(chk[i].conv_usr);
			//alert(chk[i].msg + chk[i].conv_usr);

			if(chk[i].conv_usr.substr(0,4)==snd_id.val()){

				$('<div class="msg_b">'+chk[i].msg + '</div>').insertBefore('.msg_push');
			}else{
				$('<div class="msg_a">'+chk[i].msg + '</div>').insertBefore('.msg_push');
			}
			//conv_sh.append("<li>" +chk[i].msg +  chk[i].conv_usr +"</li>");
			
//			$('.msg_body').scrollTop($('.msg_body')[0].scrollHeight);

	
		});

$('.msg_body').scrollTop($('.msg_body')[0].scrollHeight);

});




$(document).on('click','#login',function(){

signed =  usr_id.val();
	socket.emit('user_login',{usr_id:usr_id.val(),usr_pwd:usr_pwd.val(),usr_dep:Dept.val()

	},function(data){

		if(data){
			alert("good");
			$('.log_wrap').hide();	
			$('#list_all').show();	
			$('#output').show();	
			alert("Login Sucesssfully");
			//var snd_id.val(usr_id)
			var enter_val = usr_id.val();
			sat.val("Online");
			signed =  snd_id.val(enter_val);
		}else{
			$('.log_wrap').show();	
			alert("User does not Exist / Incorrect Password");
		}
		
	});	


});


$(document).on('click','#Register',function(){

	$('.log_wrap').hide();
	$('.reg_wrap').show();

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



socket.on('user_list',function(data){

		
	var cov_js = JSON.stringify(data.keys);


	$('#chatter').html(data.log_nam);
//	var conv = $.parseJSON(data.usr_unr_val);

	//alert(data.usr_unr_key[0]);
	//alert(data.usr_unr_val[0]);



	/*for(i=0; i<data.usr_unr_keys.length;i++){
			alert(data.usr_unr_key[0]);
	}*/
	//var vlu = JSON.stringify(val);
	//var vluu = $.parseJSON(vlu);
		//out_put.html(cov_js[0]);
	//alert(cov_js[0][0].conn_stat);
	//alert(data.val[1].details['name']);

		$('#list_all').html('');

		//$('#output').append("<div class='user' id=></div>");

		var lst_dpt = Dept.val();
		var hint_dp = 'hint' + Dept.val();

		//alert(lst_dpt.length);

		if(lst_dpt==='DP01'){
			var dept_nam = "Account";
		}else if(lst_dpt==='DP02'){
			var dept_nam = "Audit";
		}

		//	alert(dept_nam);
		var app = $('#output').append("<div class='user' id='" + lst_dpt + "'>"+ Dept.val() + ": " + "<span style='font-weight:bold'>" + dept_nam + "</span>" + "  " +"<span class='badge1' data-ind = '' data-badge='' id=" + hint_dp + ">" + "</span>" +"</div>");

	for(i=0; i<data.keys.length;i++){
		
		if(usr_id.val()!=data.keys[i] && data.keys[i]!="DP01" && data.keys[i]!="DP02" ){
		//alert(data.val[i].details.length);	
		
		//alert(data.val[i].conn_stat); 

		var stat_con =data.val[i].conn_stat;
		//alert(stat_con.trim().length);
		if(stat_con =="Offline"){
			var con_stu = "user_b";	
		}else{
			var con_stu = "user";
		}

			//alert(usr_id.val());
		var hint = "hint"+data.keys[i];

		 
		var app = $('#output').append("<div class='"+con_stu +"' id='" + data.keys[i] + "'>"+ data.keys[i] + ": " + "<span style='font-weight:bold'>" + data.val[i].name + "</span>" + "  " +"<span class='badge1' data-ind = '' data-badge='' id=" + hint + ">" + "</span>" +"</div>");
		//alert(data.val[i].details['name']); 
		
		}
	}


	$.each(data.usr_unr_key,function(i){
	//alert(data.usr_unr_key[i]);
	var ind_usr_rd = data.usr_unr_key[i].substring(4,8);
	if(usr_id.val()===ind_usr_rd){
	var sub_ur = data.usr_unr_key[i].substring(0,4);
	var val_s = data.usr_unr_val[i];

	//alert(data.usr_unr_val[i]);

	if(data.usr_unr_val[i]==0){
		var d_t = data.usr_unr_val[i];
		d_t = "";
	}else{

		d_t = data.usr_unr_val[i];
	}

	if((d_t!="")){
		 	var sta_ind = "true";
		 }else{
		 	var sta_ind = "false";
		 }

		var ind = $('#hint'+sub_ur).attr('data-ind','true');	 
	
		$('#'+sub_ur).find('.badge1').attr('data-badge',d_t);
	}

	/*if(data.val[i].usr_unred!=""){
		 	var sta_ind = "true";
		 }else{
		 	var sta_ind = "false";
		 }

	}*/

	
		});

var usr_ntf = 0;
$('.badge1').each(function(i){
		
//		var usr_ntf = 0;
		var value = $(this).attr('data-badge');
		
		var leng = value.length;
	
		//alert(value);				

		if(value>0){
			usr_ntf += 1; 
		
		}
			
	});

if(usr_ntf==0){
$('.badge2').attr('data-badge','');
}else{
$('.badge2').attr('data-badge',usr_ntf);	
}

//alert(usr_ntf);

			//alert(app);

	/*$.each(vlu,function(index,item){
		alert(vlu[0][index]);
	});*/

		//$.each(res.records,function(i,val){

});



socket.on('new_user_con',function(data){

	//alert(data + sat.val());

	if(sat.val()=='Online'){

				//alert(data);

				$('#'+data).removeClass('user_b');
				$('#'+data).addClass('user');

		}

});




socket.on('disconn_usr',function(data){


	//alert(data);

	if(sat.val()=='Online'){

		$('#'+data).removeClass('user');
		$('#'+data).addClass('user_b');
		//alert(data + 'disconnected');
	
	}
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

	$('.user_b').click(function(){

		$('.msg_wrap').show();
		$('.msg_box').show();
	});
	
	$('textarea').keypress(
    function(e){
        if (e.keyCode == 13) {
            e.preventDefault();
            var msg = $(this).val();
			
			if(msg!='')
			$('<div class="msg_b">'+msg+'</div>').insertBefore('.msg_push');
			$('.msg_body').scrollTop($('.msg_body')[0].scrollHeight);
			$(this).val('');
        }
    });
	


});
