// Import Vue
import Vue from 'vue';

import VueResource from 'vue-resource';
Vue.use(VueResource);

import VueMqtt from 'vue-mqtt';
var clientId = "mqttjs_"+Math.random().toString(16).substr(2.8);
Vue.use(VueMqtt, 'ws://51.91.156.154:8083', {clean:false, clientId:clientId});
/*Vue.use(VueMqtt, 'wss://vitalkeys-mqtt-broker.deepblock.io:9001', {
  clientId:clientId,
  clean:false,
  username : "admin",
  password :"kxyw3bjyDJvY"
});
*/



import VueCryptojs from 'vue-cryptojs'
Vue.use(VueCryptojs);


Vue.config.productionTip = false;


/*
import VeeValidate from 'vee-validate'
Vue.use(VeeValidate);
*/

import VueSignaturePad from 'vue-signature-pad';
Vue.use(VueSignaturePad, { penColor: "#009900"});

// Import Framework7
import Framework7 from 'framework7/framework7-lite.esm.bundle.js';

// Import Framework7-Vue Plugin
import Framework7Vue from 'framework7-vue/framework7-vue.esm.bundle.js';

import 'framework7-plugin-keypad/dist/framework7-keypad.min.css';

import  'framework7-plugin-keypad/dist/framework7-keypad.js';

//Vue.use(Framework7Keypad);
// Import Framework7 Styles
import 'framework7/css/framework7.bundle.css';

// Import Icons and App Custom Styles
import '../css/icons.css';
import '../css/app.scss';

// Import App Component
import App from '../components/app.vue'; 

// Init Framework7-Vue Plugin
Framework7.use(Framework7Vue);

Framework7.use(Framework7Keypad);


var user = {
  UID:null,
  device:"iOS",
  deviceToken:"",
  firstName:"",
  lastName:null, 
  email:null,
  pwd:null,
  phone:null,
  indicatif:"33",
  birthday:null,
  mrzValid:false,
  avatar:null,
  ciFrontSide:null,
  ciBackSide:null,
  register:false
}
var misc = {
  signatureValid:false,
  signatureData:null,
  otpVideoValid:false,
  otpVideoPath:null,
  confimOpacity:0.3
}

var photo = {
  index:0,
  valid:false
}


/*var push = "";
document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
  push = window['APNSPushNotification'].init({
    ios: {
        alert: "true",
        badge: "true",
        sound: "true"
    }
    });
    push.on('registration', (data) => {
      // data.registrationId
      alert("toto "+data.registrationId);
      alert(JSON.stringify(misc));
      deviceToken = data.registrationId;
    //  this.sendRegDetails(data.registrationId);
    });
    push.on('notification', (data) => {
      window['cordova'].plugins.notification.local.schedule({
      title: data.title,
      text: data.message,
      sound: data.sound,
      at: new Date().getTime()
      });
    });
    
    push.on('error', (e) => {
      // e.message
      console.error(e);
    });
};
*/
// Init App
var v = new Vue({
  el: '#app',
  render: (h) => h(App),
  // Register App Component
  components: {
    app: App
                //,    Keyboard
  },
  data: function () {
    return {
      user:localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : user,
      misc:misc,
      photo:photo,
      otp:'',
      deviceToken:"",
     // logFile:null
    }
  },
  methods: {
    /*
   writeLog(str) {
    console.log("going to log "+JSON.stringify(this.logFile));

	if(!this.logFile) return;
	var log = str + " [" + (new Date()) + "]\n";
  console.log("going to log "+log);
  var vm = this;
	this.logFile.createWriter(function(fileWriter) {
		
		fileWriter.seek(fileWriter.length);
		
		var blob = new Blob([log], {type:'text/plain'});
		fileWriter.write(vm.logFile);
		console.log("ok, in theory i worked");
	}, function(){
    console.log(error.code);
  });
}
  */
  },
  mounted() {
   
  /*  document.addEventListener('backbutton', function navigateBack(event) {
      event.preventDefault();
      return true;
    });
    */
  }

});


//Keyboard.automaticScrollToTopOnHiding=true;
