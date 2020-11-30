<template>
  <f7-app :params="f7params">
    <div class="navbar">
      <img
        v-bind:src="image"
        width="Automatic"
        height="40"
        style="padding-top:10px"
        class="img_logo"
      />
    </div>
    <f7-view main class="safe-areas" id="view" url="/"></f7-view>
  </f7-app>
</template>

<script>
import { Device } from "framework7/framework7-lite.esm.bundle.js";
import cordovaApp from "../js/cordova-app.js";
import routes from "../js/routes.js";

export default {
  data() {
    return {
      f7params: {
        id: "io.vital.sign", // App bundle ID
        name: "Vital Sign", // App name
        theme: "auto", // Automatic theme detection

        // App routes
        routes: routes,

        // Input settings
        input: {
          //          scrollIntoViewOnFocus: Device.cordova && !Device.electron,
          //         scrollIntoViewCentered: Device.cordova && !Device.electron
          scrollIntoViewOnFocus: true,
          scrollIntoViewAlways: true,
          scrollIntoViewCentered: true
        },
        // Cordova Statusbar settings
        statusbar: {
          iosOverlaysWebView: true,
          androidOverlaysWebView: false
        }
      },
      image: "./static/img/logo-VitalKeys.png"
    };
  },

  methods: {
    onBackKeyDown: function() {}
    /*      
      alertLoginData() {
*  var srcType = Camera.PictureSourceType.SAVEDPHOTOALBUM;
  var options = this.setOptions(srcType);
  var func = this.createNewFileEntry;

    navigator.camera.getPicture(function cameraSuccess(imageUri) { });   
*
      }
      */
  },
  mounted() {
    this.$f7ready(f7 => {
      // Init cordova APIs (see cordova-app.js)
      if (Device.cordova) {
        cordovaApp.init(f7);
        screen.orientation.lock("portrait");
        var push = window["APNSPushNotification"].init({
          ios: {
            alert: "true",
            badge: "true",
            sound: "true"
          }
        });

        push.on("registration", data => {
          // data.registrationId
          this.$root.user.deviceToken = data.registrationId;

          //  this.sendRegDetails(data.registrationId);
        });

        push.on("notification", data => {
          window["cordova"].plugins.notification.local.schedule({
            title: data.title,
            text: data.message,
            sound: data.sound,
            at: new Date().getTime()
          });
        });

        push.on("error", e => {
          // e.message
          console.error(e);
        });
        /*
        console.log("cordova file "+cordova.file.dataDirectory);
        console.log("cordova file "+cordova.file.documentsDirectory);
        var vm = this;
        window.resolveLocalFileSystemURL(cordova.file.documentsDirectory, function(dir) {
          console.log("got main dir", dir);
          dir.getFile("VitalKey.txt", { create: true }, function(file) {
            console.log("got the file", JSON.stringify(file));
            vm.$root.logFile = file;
            vm.$root.writeLog("App started");
          });
        });
        */
      }
    });
  }
};
document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
  window.open = cordova.InAppBrowser.open;
  document.addEventListener(
    "backbutton",
    function(e) {
      e.preventDefault();
    },
    false
  );
}
/*
           this.$f7.dialog.alert(
          "Ce service est réservé aux plus de 14 ans<br/>This service is reserved for people over 14 years old"
        );
        */

/*
    var push = VoIPPushNotification.init();

push.on('registration', function(data) {
    console.log("[Ionic] registration callback called");
    console.log(data);

    //data.deviceToken;
    //do something with the device token (probably save it to your backend service)
});

push.on('notification', function(data) {
    console.log("[Ionic] notification callback called");
    console.log(data);

    // do something based on received data
});

push.on('error', function(e) {
    console.log(e);
});
*/
</script>