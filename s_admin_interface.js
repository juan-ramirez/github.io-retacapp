$(function() {
var config = {
    apiKey: "AIzaSyAfyhyO0em2wsG5jHXgXDtRceI-2f_1T0o",
    authDomain: "retacapp-168903.firebaseapp.com",
    databaseURL: "https://retacapp-168903.firebaseio.com",
    projectId: "retacapp-168903",
    storageBucket: "retacapp-168903.appspot.com",
    messagingSenderId: "1039891133697"
  };
  firebase.initializeApp(config);

	  btnLogout.addEventListener('click', e=>{
	  	window.alert("hola");  		
	  	firebase.auth().signOut();	  	
	  	window.location.href = "index.html";
	  });
  });