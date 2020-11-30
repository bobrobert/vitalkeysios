<template>
  <f7-page name="register-pict">
    <div class="text-align-center" style="font-size:18px">Vos documents d'identité recto/verso</div>
    <div class="small-text text-align-center">Add documents</div>
    <f7-row style="padding:10px 0">
      <f7-col>
        <img
          :src="imgSrc(user.avatar,'./static/img/avatar.png')"
          v-on:click="getPicture(0)"
          class="img-selfie"
          id="selfie"
         
        />
        <br />
        <span style="font-size:20px;line-height:1">
          Votre portrait (selfie)
          <br />
          <span class="small-text">Your picture</span>
        </span>
      </f7-col>
    </f7-row>
    <f7-row style="padding:10px 20px">
      <f7-col width="60" style="text-align:left;">
        <div style="font-size:16px;line-height:1.5">Carte nationale d'identité</div>
        <div style="font-size:16px;line-height:1.5">Passeport</div>
        <div style="font-size:16px;line-height:1.5">Carte de séjour</div>
        <div style="font-size:16px;line-height:1.5">Permis de conduire</div>
        <br />
        <br />
        <div style="font-size:16px;line-height:1.5">National Identity Card</div>
        <div style="font-size:16px;line-height:1.5">Passport</div>
        <div style="font-size:16px;line-height:1.5">Residence permit</div>
        <div style="font-size:16px;line-height:1.5">Driver's license</div>
      </f7-col>
      <f7-col width="40">
        <div>
          <img
            :src="imgSrc(user.ciFrontSide,'./static/img/licence.png')"
            v-on:click="getPicture(1)"
            class="img-licence"
          width=400
          height=400
          />
        </div>
        <div style="font-size:16px;">recto</div>
        <div>
          <img
            :src="imgSrc(user.ciBackSide,'./static/img/licence-back.png')"
            v-on:click="getPicture(2)"
            class="img-licence"
          width=400
          height=400
          />
        </div>
        <div style="font-size:16px;">verso</div>
      </f7-col>
    </f7-row>
    <ul style="text-align:center;list-style-type:none;margin:5px">
      <li style="color:#f00;min-height:20px">{{ regErrors }}</li>
    </ul>

    <f7-row style="margin:0 10px">
      <f7-col width="50">
        <f7-button outline round large v-on:click="previousClicked">
          Précédent/
          <span class="small-text">Previous</span>
        </f7-button>
      </f7-col>
      <f7-col width="50">
        <f7-button outline round large v-on:click="valid">
          suivant/
          <span class="small-text">Next</span>
        </f7-button>
      </f7-col>
    </f7-row>
  </f7-page>
</template>
<script>
//import Mrz from "mrz";

export default {
  data() {
    return {
      regErrors: "",
      user: this.$root.user,
      cameraGetIndex: 0,
      xhr: null
    };
  },
  methods: {
    valid() {
      if (this.user.avatar && this.user.ciFrontSide && this.user.ciBackSide) {
        this.user.UID =
          this.user.firstName +
          this.user.lastName +
          this.user.email +
          this.user.phone +
          Math.random()
            .toString(36)
            .substring(2, 10);
        this.$root.user = this.user;
        localStorage.setItem("user", JSON.stringify(this.$root.user));
        this.$f7router.navigate({ name: "codepenal" });
      }
      this.regErrors = "";
      if (!this.user.avatar) {
        this.regErrors = "Selfie required.";
        return;
      }
      if (!this.user.ciFrontSide) {
        this.regErrors = "Id card front required.";
        return;
      }
      if (!this.user.ciBackSide) {
        this.regErrors = "Id card back required.";
        return;
      }
    },
    previousClicked() {
      this.$f7router.back();
    },
    // Use the camera plugin to capture image
    getPicture(index) {
      this.$root.photo.index = index;
       this.$f7router.navigate({ name: "photo" });
       return;
      //   var result = Mrz.parse("./static/img/crop.png");
      //

      //                  this.$f7.dialog.alert("index "+index,'');

      this.cameraGetIndex = index;
      if (navigator.camera) {
        var vm = this;
        navigator.camera.getPicture(
          this.setPicture,
          function(error) {
            setTimeout(function() {
              vm.$f7.dialog.alert("error :" + error);
            }, 200);
          },
          {
            destinationType: Camera.DestinationType.DATA_URL,
            //destinationType: Camera.DestinationType.FILE_URI,
            targetWidth: index == 0 ? 400 : 400,
            targetHeight: index == 0 ? 400 : 400,
            quality: 50,
            allowEdit: true,
            encodingType: Camera.EncodingType.JPEG,

            //  encodingType: Camera.EncodingType.JPEG,
            //cameraDirection: index == 0 ? 1 : 0

          }
        );
      } else {
        // If the navigator.camera is not available display generic error to the user.
        this.error();
      }
    },
    // Set the picture path in the data of the vue
    // this action will automatically update the view.
    setPicture(imageData) {
      var vm = this;
      switch (vm.cameraGetIndex) {
        case 0:
          vm.user.avatar = "data:image/jpeg;base64," + imageData;
          break;
        case 1:
          vm.user.ciFrontSide = "data:image/jpeg;base64," + imageData;
          break;
        case 2:
          vm.user.ciBackSide = "data:image/jpeg;base64," + imageData;
          break;
      }
      return;
      window.resolveLocalFileSystemURL(
        imageData,
        function(fileEntry) {
          fileEntry.file(
            function(file) {
              var reader = new FileReader();
              reader.onloadend = function(evt) {
                switch (vm.cameraGetIndex) {
                  case 0:
                    vm.user.avatar = evt.target.result;
                    break;
                  case 1:
                    vm.user.ciFrontSide = evt.target.result;
                    break;
                  case 2:
                    vm.user.ciBackSide = evt.target.result;
                    break;
                }
              };
              reader.onerror = function(event) {
                vm.$f7.dialog.alert("error :" + reader.error);
              };
              reader.readAsDataURL(file);
            },
            function(error) {
              vm.$f7.dialog.alert("error :" + error);
            }
          );
        },
        function(error) {
          vm.$f7.dialog.alert("error :" + error);
        }
      );
    },
    imgSrc(img, def) {
      return img ? img : def;
    },
    error(message) {
      this.$f7.dialog.alert("Camera error : " + message);
    },
    onSuccess(fileEntry) {
      this.$f7.dialog.alert("ok : " + fileEntry);
      this.$f7.dialog.alert("ok : " + fileEntry.name);
    },
    onError(evt) {
      this.$f7.dialog.alert("error : " + evt.target.error);
    }
  },
  mounted() {}
};
</script>