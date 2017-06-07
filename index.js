$(function() {

	// Initialize Firebase
  var config = {
    apiKey: "AIzaSyAfyhyO0em2wsG5jHXgXDtRceI-2f_1T0o",
    authDomain: "retacapp-168903.firebaseapp.com",
    databaseURL: "https://retacapp-168903.firebaseio.com",
    projectId: "retacapp-168903",
    storageBucket: "retacapp-168903.appspot.com",
    messagingSenderId: "1039891133697"
  };
  firebase.initializeApp(config);
    
    var $formLogin = $('#login-form');
    var $formLost = $('#lost-form');
    var $formRegister = $('#register-form');
    var $divForms = $('#div-forms');
    var $modalAnimateTime = 300;
    var $msgAnimateTime = 150;
    var $msgShowTime = 2000;

    //get elements
    const login_username = document.getElementById('login_username');
    const login_password = document.getElementById('login_password');
    const checkboxLogin = document.getElementById('checkboxLogin');

    btnLogin.addEventListener('click', e=>{
    	const user_name = login_username.value;
        const password = login_password.value;
        const checkBoxLog = checkboxLogin.value;
        const auth = firebase.auth();

        const promise = auth.signInWithEmailAndPassword(user_name, password);

        promise
        	.then(user => window.location.href = "s_admin_interface.html")
        	.catch(e => msgChange($('#div-login-msg'), $('#icon-login-msg'), $('#text-login-msg'), "error", "glyphicon-remove", e.message));

    });

    firebase.auth().onAuthStateChanged(firebaseUser => {
    	if(firebaseUser){
    		window.location.href = "s_admin_interface.html";
    	}else{
    		window.alert("no está logueado");
    	}
    });


    $("form").submit(function () {
        switch(this.id) {
            case "login-form":
                var $lg_username=$('#login_username').val();
                var $lg_password=$('#login_password').val();
                if ($lg_username == "ERROR") {
                    msgChange($('#div-login-msg'), $('#icon-login-msg'), $('#text-login-msg'), "error", "glyphicon-remove", "Login error");
                } else {

                    const user_name = login_username.value;
                    const password = login_password.value;
                    const checkBoxLog = checkboxLogin.value;                    

                    //get email and password
                    /*var user = firebase.auth().signInWithEmailAndPassword(user_name, password).catch(function(error) {
                        // Handle Errors here.
                        var errorCode = error.code;
                        var errorMessage = error.message;
                        // ...
                        if (errorCode == "auth/wrong-password" ){
                        	window.alert(errorMessage)
                            msgChange($('#div-login-msg'), $('#icon-login-msg'), $('#text-login-msg'), "error", "glyphicon-remove", errorMessage);
                        }else if (errorCode == "auth/invalid-email"){
                            msgChange($('#div-login-msg'), $('#icon-login-msg'), $('#text-login-msg'), "error", "glyphicon-remove", errorMessage);
                        }else if (errorCode == "auth/network-request-failed"){
                        	window.alert(errorMessage)
                            msgChange($('#div-login-msg'), $('#icon-login-msg'), $('#text-login-msg'), "error", "glyphicon-remove", errorMessage);
                        }
                    });*/
                    

                    /*firebase.auth().onAuthStateChanged(function (user) {
                        if(user){
                        	window.location.href = "s_admin_interface.html";
                        }else{
                            window.alert("no logueado")
                        }
                    });*/
                }
                return false;
                break;
            case "lost-form":
                var $ls_email=$('#lost_email').val();
                if ($ls_email == "ERROR") {
                    msgChange($('#div-lost-msg'), $('#icon-lost-msg'), $('#text-lost-msg'), "error", "glyphicon-remove", "Send error");
                } else {
                    msgChange($('#div-lost-msg'), $('#icon-lost-msg'), $('#text-lost-msg'), "success", "glyphicon-ok", "Send OK");
                }
                return false;
                break;
            case "register-form":
                var $rg_username=$('#register_username').val();
                var $rg_email=$('#register_email').val();
                var $rg_password=$('#register_password').val();
                if ($rg_username == "ERROR") {
                    msgChange($('#div-register-msg'), $('#icon-register-msg'), $('#text-register-msg'), "error", "glyphicon-remove", "Register error");
                } else {
                    msgChange($('#div-register-msg'), $('#icon-register-msg'), $('#text-register-msg'), "success", "glyphicon-ok", "Register OK");
                }
                return false;
                break;
            default:
                return false;
        }
        return false;
    });
    
    $('#login_register_btn').click( function () { modalAnimate($formLogin, $formRegister) });
    $('#register_login_btn').click( function () { modalAnimate($formRegister, $formLogin); });
    $('#login_lost_btn').click( function () { modalAnimate($formLogin, $formLost); });
    $('#lost_login_btn').click( function () { modalAnimate($formLost, $formLogin); });
    $('#lost_register_btn').click( function () { modalAnimate($formLost, $formRegister); });
    $('#register_lost_btn').click( function () { modalAnimate($formRegister, $formLost); });
    
    function modalAnimate ($oldForm, $newForm) {
        var $oldH = $oldForm.height();
        var $newH = $newForm.height();
        $divForms.css("height",$oldH);
        $oldForm.fadeToggle($modalAnimateTime, function(){
            $divForms.animate({height: $newH}, $modalAnimateTime, function(){
                $newForm.fadeToggle($modalAnimateTime);
            });
        });
    }
    
    function msgFade ($msgId, $msgText) {
        $msgId.fadeOut($msgAnimateTime, function() {
            $(this).text($msgText).fadeIn($msgAnimateTime);
        });
    }
    
    function msgChange($divTag, $iconTag, $textTag, $divClass, $iconClass, $msgText) {
        var $msgOld = $divTag.text();
        msgFade($textTag, $msgText);
        $divTag.addClass($divClass);
        $iconTag.removeClass("glyphicon-chevron-right");
        $iconTag.addClass($iconClass + " " + $divClass);
        setTimeout(function() {
            msgFade($textTag, $msgOld);
            $divTag.removeClass($divClass);
            $iconTag.addClass("glyphicon-chevron-right");
            $iconTag.removeClass($iconClass + " " + $divClass);
  		}, $msgShowTime);
    }
});