<template>
  <f7-page name="otp">
    <div class="page-content">
      <div class="text-align-center" style="font-size:20px" v-if="code.length == 0">
        En attente de votre OTP
        <br>
        <span class="small-text">Waiting your OTP</span>
      </div>
      <div class="text-align-center" style="font-size:20px" v-if="code.length">
        Votre code OTP
        <br>
        <span class="small-text">Your OTP code is</span>
      </div>
      <div
        class="list no-hairlines-md display-flex justify-content-center align-items-center"
        style="min-height:40%"
      >
        <form style="width:80%">
          <ul>
            <li>
              <div
                class="item-inner block passcode-input border-round display-flex align-items-center"
                style="min-height:80px"
              >
                <div id="otp-inline">{{code}}</div>
              </div>
            </li>
          </ul>
          <ul style="text-align:center;color:#f00;min-height:24px">
            <li
              v-if="code.length"
              style="text-align:justify;text-justify: inter-word;"
            >Merci de confirmer que vous avez reçu votre code OTP ou que vous avez signé et que vous avez enregistré une vidéo selfie de votre code OTP</li>
            <li v-if="code.length" style="text-align:justify;text-justify: inter-word;">
              <span
                class="small-text"
              >Please confirm that you have received your OTP code or if you sign and you have recorded a selfie video of your OTP code</span>
            </li>
          </ul>
        </form>
      </div>
      <div class="block">
        <div class="row justify-content-space-beetween" v-if="signature =='MQ'">
          <div class="col" style="width:45%">
            <button
              class="button button-outline button-round"
              v-on:click="sign"
              v-if="code.length ">
              Signature/
              <span class="small-text">Sign</span>
            </button>
          </div>
          <div class="col" style="width:45%">
            <button
              class="button button-outline button-round"
              v-on:click="otpVideo"
              v-if="code.length "
            >
              Otp vidéo/
              <span class="small-text">Otp video</span>
            </button>
          </div>
        </div>
        <div class="row justify-content-space-beetween" style="margin-top:5px;" >
          <div class="col" style="width:45%" >
            <button
              v-if="code.length==0"
              class="button button-outline button-round"
              v-on:click="goBack">Home</button>
            <button
              class="button button-outline button-round"
              v-on:click="sign"
              v-if="code.length && signature =='M'">
              Signature/
              <span class="small-text">Sign</span>
            </button>
            <button
              class="button button-outline button-round"
              v-on:click="otpVideo"
              v-if="code.length && signature =='Q'">
              Otp vidéo/
              <span class="small-text">Otp video</span>
            </button>
          </div>
          <div class="col" style="width:45%">
            <button
              class="button button-outline button-round"
              :disabled="code.length == 0 || ( (signature =='M' || signature =='MQ') && !misc.signatureValid) || ( (signature =='Q' || signature =='MQ') && !misc.otpVideoValid)"
              v-bind:style="( (signature =='M' || signature =='MQ') && !misc.signatureValid) || ( (signature =='Q' || signature =='MQ') && !misc.otpVideoValid) ? 'opacity: 0.3' : 'opacity: 1'"
              v-on:click="confirmedOtp"
            >
              Confirmer/
              <span class="small-text">Confirm</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </f7-page>
</template>
<script type="text/javascript" src="js/signature_pad.min.js"></script>
<style>
.opt_text {
  font-size: 2em !important;
  text-align: center;
  color: #999;
}
#otp-inline {
  -webkit-appearance: none;
  -moz-appearance: none;
  -ms-appearance: none;
  appearance: none;
  box-sizing: border-box;
  border: none;
  background: none;
  border-radius: 0 0 0 0;
  box-shadow: none;
  display: block;
  padding: 0 0 0 5px;
  margin: 0;
  width: 100%;
  height: 43px;
  color: #dedede;
  font-family: inherit;
  letter-spacing: 15px;
  text-align: center;
  font-size: 2em;
  font-weight: 300;
}
</style>
<script>
export default {
  data() {
    return {
      errors: [],
      code: localStorage.getItem("code") ? localStorage.getItem("code") : "",
      misc: this.$root.misc,
      pwd: this.$root.user.pwd,
      UID: this.$root.user.UID,
      signature: "M"
    };
  },

  mqtt: {
    "notification/#"(data) {
      var mess = JSON.parse(data);
      if (mess.action == "OTP") {
        this.code = mess.code;
        this.signature = mess.signature;
        localStorage.setItem("code", mess.code);
        this.$mqtt.publish(
          "notification/" + this.UID,
          JSON.stringify({ action: "ackOtp" },
          {qos:1})
        );
      }
    }
  },

  methods: {
    goBack() {
      this.$f7router.navigate({ name: "welcome" });
    },
    confirmedOtp() {
      this.$f7router.navigate({ name: "welcome" });
      var vm = this;
      if (this.misc.otpVideoValid) {
        var videoUrl = "file://"+this.misc.otpVideoPath.substring(8);
        window.resolveLocalFileSystemURL(
          videoUrl,
          function(fileEntry) {

            fileEntry.file(
              function(file) {
                const reader = new FileReader();
                reader.onloadend = function() {
                  vm.$mqtt.publish(
                    "notification/" + vm.UID,
                    JSON.stringify({
                      action: "done",
                      handwrittenSignImg: vm.misc.signatureValid
                        ? vm.misc.signatureData
                        : null,
                      otpSignVideo: this.result
                    },
                    {qos:1})
                  );
                };
                reader.readAsDataURL(file);
              },
              function(error) {
                vm.$f7.dialog.alert("Error uploading OTP video signature"+JSON.stringify(error));
              }
            );
          },
          function(error) {
            vm.$f7.dialog.alert("Error while uploading OTP video signature"+JSON.stringify(error));
          }
        );
      } else if (this.misc.signatureValid) {
        vm.$mqtt.publish(
          "notification/" + vm.UID,
          JSON.stringify({
            action: "done",
            handwrittenSignImg: vm.misc.signatureValid  ? vm.misc.signatureData  : null,
            otpSignVideo: null
          },
          {qos:1})
        );
      }

      localStorage.setItem("code", "");
      this.$root.misc = {
        signatureValid: false,
        signatureData: null,
        otpVideoValid: false,
        otpVideoPath: null
      };
    },
    sign() {
      this.$f7router.navigate({ name: "signature" });
    },
    otpVideo() {
      this.$f7router.navigate({ name: "videootp" });
    }
  },

  beforeMount() {
    // this.$mqtt.subscribe("notification/"+this.UID);
  }
};
</script>