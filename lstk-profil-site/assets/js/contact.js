/**	@Contact
*************************************************** **/
// @CONTACT FORM - TRANSLATE OR EDIT
var errMsg 					= 'Пожалуйста, заполните все поля!',
	errEmail				= 'Неверный Email!',
	okSent					= '<strong>Спасибо!</strong> Сообщение отправлено!';


// @GOOGLE MAP UNCOVER
jQuery("a.gmapShow").bind("click", function(e) {
	e.preventDefault();

	jQuery('#gmap').css({"z-index":"101"});
	jQuery('#footerContent').css({"opacity":"0"});
	jQuery('a.gmapClose').fadeIn(500);
});

// @GOOGLE MAP COVER
jQuery("a.gmapClose").bind("click", function(e) {
	e.preventDefault();

	jQuery('#gmap').css({"z-index":"1"});
	jQuery('#footerContent').css({"opacity":"1"});
	jQuery('a.gmapClose').fadeOut(500);
});

// @VALIDATE && SEND
jQuery("#emailForm button").bind("click", function(e) {
	e.preventDefault();

	// hide alerts && remove red border error
	jQuery("#alertErr , #alertOk").hide();
	jQuery("input.err , textarea.err").removeClass('err');

	var t 			= jQuery(this),
		_name		= jQuery("#name").val(),
		_phone		= jQuery("#phone").val(),
		_email		= jQuery("#email").val(),
		_message	= jQuery("#message").val(),
		err 		= false;

	// check name
	if(_name.trim() == '') {
		err = true;
		jQuery("#name").addClass('err');
	}
	// check phone
	if(_phone.trim() == '') {
		err = true;
		jQuery("#phone").addClass('err');
	}
	// check email
	if(_email.trim() == '') {
		err = true;
		jQuery("#email").addClass('err');
	}
	// check message
	if(_message.trim() == '') {
		err = true;
		jQuery("#message").addClass('err');
	}

	// print error if any
	if(err == true) {
		jQuery("#alertErrResponse").empty().append(errMsg);
		jQuery("#alertErr").show();
	}
	if(err != true) {
		$('#alertOk').css('display', 'block');	
	}
	// AJAX POST 
	$.ajax({
		url: 	jQuery("#emailForm").attr('action'),
		data: 	{ajax:"true", action:'email_send', name:_name, phone:_phone, email:_email, message:_message},
		type: 	jQuery("#emailForm").attr('method'),
		error: 	function(XMLHttpRequest, textStatus, errorThrown) {
			jQuery("#alertErrResponse").empty().append('Server Internal Error'); // usualy on headers 404
			jQuery("#alertErr").show();
		},
		success: function(data) {
			data = data.trim();

			// PHP RETURN: Mandatory Fields
			if(data == '_required_') {
				jQuery("#alertErrResponse").empty().append(errMsg);
				jQuery("#alertErr").show();
			} else

			// PHP RETURN: INVALID EMAIL
			if(data == '_invalid_email_') {
				jQuery("#alertErrResponse").empty().append(errEmail);
				jQuery("#alertErr").show();
			} else

			// PHP RETURN: INVALID EMAIL
			if(data == '_sent_ok_') {

				// hide error warning if visible
				jQuery("#alertErr").hide();

				// append message and show ok alert
				jQuery("#alertOkResponse").empty().append(okSent);
				jQuery("#alertOk").show();

				// reset form
				jQuery("#name, #phone, #email, #message").val('');

			} else {

				// PHPMAILER ERROR
				jQuery("#alertErrResponse").empty().append(data);
				jQuery("#alertErr").show();

			}
		}
	});

});

// @VALIDATE && SEND
jQuery("#zamerForm").bind("submit", function(e) {
	e.preventDefault();

	// hide alerts && remove red border error
	jQuery("#zamerchikModal #alertErr , #zamerchikModal #alertOk").hide();
	jQuery("#zamerchikModal input.err , #zamerchikModal textarea.err").removeClass('err');

	var t 			= jQuery(this),
		_name		= jQuery("#zamerchikModal #name").val(),
		_phone		=jQuery("#zamerchikModal #phone").val(),
		_address	=jQuery("#zamerchikModal #address").val()
		err 		= false;

	// check name
	if(_name.trim() == '') {
		err = true;
		jQuery("#zamerchikModal #name").addClass('err');
	}
	// check phone
	if(_phone.trim() == '') {
		err = true;
		jQuery("#zamerchikModal #phone").addClass('err');
	}
	// check address
	if(_address.trim() == '') {
		err = true;
		jQuery("#zamerchikModal #address").addClass('err');
	}
		console.log(err);
		if (err == false) {
			$('#zamerchikModal #alertOk').css('display', 'block');
		}
		
		// AJAX POST 
		$.ajax({
			url: 	jQuery("#zamerchikModal #zamerForm").attr('action'),
			data: 	{ajax:"true", action:'email_send', name:_name, phone:_phone, address:_address},
			type: 	jQuery("#zamerForm").attr('method'),
			error: 	function(XMLHttpRequest, textStatus, errorThrown) {
				jQuery("#zamerchikModal #alertErrResponse").empty().append('Server Internal Error'); // usualy on headers 404
				jQuery("#zamerchikModal #alertErr").show();
			},
			success: function(data) {
				data = data.trim();

				// PHP RETURN: Mandatory Fields
				if(data == '_required_') {
					jQuery("#zamerchikModal #alertErrResponse").empty().append(errMsg);
					jQuery("#zamerchikModal #alertErr").show();
				} else

				// PHP RETURN: INVALID EMAIL
				if(data == '_invalid_email_') {
					jQuery("#zamerchikModal #alertErrResponse").empty().append(errEmail);
					jQuery("#zamerchikModal #alertErr").show();
				} else

				// PHP RETURN: INVALID EMAIL
				if(data == '_sent_ok_') {

					// hide error warning if visible
					jQuery("#zamerchikModal #alertErr").hide();

					// append message and show ok alert
					jQuery("#zamerchikModal #alertOkResponse").empty().append(okSent);
					

					// reset form
					jQuery("#zamerchikModal #name, #zamerchikModal #phone, #zamerchikModal #email, #zamerchikModal #message, #zamerchikModal #address").val('');

				} else {

					// PHPMAILER ERROR
					jQuery("#zamerchikModal #alertErrResponse").empty().append(data);
					jQuery("#zamerchikModal #alertErr").show();

				}
			}
		});



	});




// remove error (red border) when user start typing
jQuery("input, textarea").bind("keyup", function() {
	jQuery(this).removeClass('err');
});
