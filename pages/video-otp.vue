<template>
  <f7-page name="signature">

    <div class="text-align-center" style="font-size:18px">
      Enregistrement vidéo de votre code OTP
      <br>
      <span class="small-text">Video recording of your OTP code</span>
      <div class="otp_text">{{code}}</div>

    </div>
    <div style="display:flex;justify-content:center;height:320px">
        <video width="80%" controls
         :src="otpVideoSrc()" type="video/mp4">
      </video>
    </div>
    <div class="block">
      <div class="row justify-content-space-around">
        <div class="col">
          <button class="button button-outline button-round" v-on:click="abort">Abort</button>
        </div>
        <div class="col">
          <button class="button button-outline button-round" v-on:click="otpVideo">Record</button>
        </div>
        <div class="col">
          <button class="button button-outline button-round" v-on:click="valid" 
              :disabled="!misc.otpVideoValid"
              v-bind:style="{ opacity: opacityValid}">
            Valid
          </button>
        </div>
      </div>
    </div>


  </f7-page>
</template>

<style>
.otp_text {
  font-size: 2em !important;
  text-align: center;
  color: #dedede;
}

</style>
<script>
export default {
  name: "MySignaturePad",

  data() {
    return {
      misc:this.$root.misc,
      code: localStorage.getItem("code") ? localStorage.getItem("code") : "",
      opacityValid:this.$root.misc.otpVideoValid ? 1 : 0.3
    };
  },
  methods: {
    abort() {
      this.misc.otpVideoValid = false;
      this.$root.misc = this.misc;
      this.$f7router.back();
    },


    valid() {
      this.$root.misc = this.misc;
      this.$f7router.back();

    },
    // capture callback
    captureError(error) {
      navigator.notification.alert(
        "Error code: " + error.code,
        null,
        "Capture Error"
      );
    },
    captureSuccess(mediaFiles) {
      var i, path, len;
      for (i = 0, len = mediaFiles.length; i < len; i += 1) {
        path = mediaFiles[i].fullPath;
        // do something interesting with the file
      }
      var vm = this;
      mediaFiles[0].getFormatData(  function successCallback(MediaFileData ) {
        if(MediaFileData.duration >= 2){
          vm.misc.otpVideoValid = true;
          vm.misc.otpVideoPath = mediaFiles[0].fullPath;
          vm.opacityValid = 1;
        }
      }
      );
    },
    otpVideo() {

      if (navigator.device.capture) {
        navigator.device.capture.captureVideo(
          this.captureSuccess,
          this.captureError,
          { duration: 7 }
//          { duration: 7, quality:0 }
        );
     }
    },
    otpVideoSrc(){
      return this.misc.otpVideoValid ? this.misc.otpVideoPath : "";
    }    
  }
};
</script>